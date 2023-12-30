import { Connection, createConnection, getConnectionManager } from 'typeorm';

import { dbConfig } from './config';

export const dbCreateConnection = async (): Promise<Connection | any> => {
  try {
    const conn = await createConnection(dbConfig);
    return conn;
  } catch (err: any) {
    if (err.name === 'AlreadyHasActiveConnectionError') {
      const activeConnection = getConnectionManager().get(dbConfig.name);
      return activeConnection;
    }
    return err;
  }
};
