require('dotenv').config();
import Logger from 'roarr';
import { createPool } from 'slonik';
// @ts-expect-error
import { createInterceptors } from 'slonik-interceptor-preset';
import { createFastifyServer } from '../factories/createFastifyServer';

export async function runServer() {
  const log = Logger.child({ context: 'bin/server' });

  if (!process.env.POSTGRES_CONNECTION_STRING)
    throw new Error(
      'Must provide a PG connection string (export POSTGRES_CONNECTION_STRING=value) -- if you need a fresh database, we recommend using Render.com',
    );

  const pool = createPool(process.env.POSTGRES_CONNECTION_STRING, {
    captureStackTrace: false,
    connectionTimeout: 60 * 1_000,
    interceptors: createInterceptors(),
  });

  const app = await createFastifyServer(pool);

  app.listen(8_080, () =>
    log.info(`🛩 Server ready at http://localhost:8080/graphql`),
  );

  await app.ready();

  return app;
}
