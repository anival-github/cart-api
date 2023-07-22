import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import config from '../config/config';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as rds from 'aws-cdk-lib/aws-rds';
import { SecretValue } from 'aws-cdk-lib';

export class CartApiConstruct extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const { PGDB_PASSWORD, PGDB_USER, PGDB_REGION } = config;

    const privateSubnetConfig = {
      cidrMask: 24,
      name: 'privatelambda',
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
    };

    const publicSubnetConfig = {
      cidrMask: 24,
      name: 'public',
      subnetType: ec2.SubnetType.PUBLIC,
    };

    const vpc = new ec2.Vpc(this, 'vpc', {
      subnetConfiguration: [privateSubnetConfig, publicSubnetConfig]
    });

    const dbSecurityGroup = new ec2.SecurityGroup(this, 'DbSecurityGroup', { vpc });
    const lambdaSG = new ec2.SecurityGroup(this, 'LambdaSG', { vpc });

    dbSecurityGroup.addIngressRule(
      lambdaSG,
      ec2.Port.tcp(5432),
      'Lambda to Postgres database'
    );

    dbSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic(), 'Rule for dev env - to connect from DBeaver');

    const databaseName = 'CartDb';

    const dbInstance = new rds.DatabaseInstance(this, 'DbInstance', {
      engine: rds.DatabaseInstanceEngine.postgres({
        version: rds.PostgresEngineVersion.VER_13_8,
      }),
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.BURSTABLE3,
        ec2.InstanceSize.SMALL
      ),
      vpc,
      vpcSubnets: vpc.selectSubnets({
        subnetType: ec2.SubnetType.PUBLIC, // Can be changed to subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS - in this case additional config needed in order to connect from DBeaver
      }),
      databaseName,
      securityGroups: [dbSecurityGroup],
      credentials: rds.Credentials.fromPassword(PGDB_USER, SecretValue.unsafePlainText(PGDB_PASSWORD)),
      maxAllocatedStorage: 200,
      publiclyAccessible: true,
    });

    const apiHandler = new NodejsFunction(
      this,
      'CartApiHandler',
      {
        entry: 'dist/main.js',
        runtime: lambda.Runtime.NODEJS_18_X,
        environment: {
          DB_ENDPOINT_ADDRESS: dbInstance.dbInstanceEndpointAddress,
          DB_NAME: databaseName,
          DB_SECRET_ARN: dbInstance.secret?.secretFullArn || '',
          PGDB_REGION,
          PGDB_PORT: dbInstance.dbInstanceEndpointPort,
          PGDB_USER,
          PGDB_PASSWORD,
        },  
        timeout: cdk.Duration.seconds(300),
        bundling: {
          externalModules: [
            'aws-sdk',
            'pg-native'
          ],
        },
        vpc,
        vpcSubnets: vpc.selectSubnets({
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        }),
        securityGroups: [lambdaSG],
      }
    );

    dbInstance.secret?.grantRead(apiHandler);

    const api = new apigateway.RestApi(this, 'products-api', {
      restApiName: 'Cart Api',
      description: 'This service provides cart db access.',
    });

    const cartApiLambdaIntegration = new apigateway.LambdaIntegration(
      apiHandler
    );

    api.root.addProxy({
      defaultIntegration: cartApiLambdaIntegration,
    });
  }
}
