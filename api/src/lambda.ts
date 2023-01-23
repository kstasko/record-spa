
import serverlessExpress from '@vendia/serverless-express';
import createApp from './server';

async function loadHandler () {
  const app = await createApp();
  return serverlessExpress({app})
}

const handlerPromise = loadHandler();

async function handler (event, context, callback) {
  const handler = await handlerPromise;
  return handler(event, context, callback)
}

exports.handler = handler