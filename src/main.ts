import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
import { AppModule } from './app.module';
import { Handler } from 'aws-lambda';

const port = process.env.PORT || 4000;
const deployVia = process.env.DEPLOY_VIA;

let cachedServer: Handler;

const bootstrapForLambda = async (): Promise<Handler> => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: expressApp });
}

const bootstrapForEC2 = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  // app.enableCors({
  //   origin: (req, callback) => callback(null, true),
  // });
}

if (deployVia === 'EB') {
  bootstrapForEC2().then(() => {
    console.log('App is running on %s port', port);
  });
}

export const handler: Handler = async (event, context, callback) => {
  if (!cachedServer) {
    cachedServer = await bootstrapForLambda();
  }

  return cachedServer(event, context, callback);
}