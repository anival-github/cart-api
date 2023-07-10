import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@vendia/serverless-express';
// import helmet from 'helmet';
import { AppModule } from './app.module';
import { Handler } from 'aws-lambda';

// const port = process.env.PORT || 4000;

let cachedServer: Handler;

const bootstrap = async (): Promise<Handler> => {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const expressApp = app.getHttpAdapter().getInstance();

  // app.enableCors({
  //   origin: (req, callback) => callback(null, true),
  // });
  // app.use(helmet());

  // await app.listen(port);
  return serverlessExpress({ app: expressApp });
}

// bootstrap().then(() => {
//   console.log('App is running on %s port', port);
// });

export const handler: Handler = async (event, context, callback) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return cachedServer(event, context, callback);

  // return proxy(cachedServer, event, context, 'PROMISE').promise;
}