import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import morgan from 'morgan';

import { PORT } from '../config/env';

export class ExpressServer {
  private readonly _app: Application;

  readonly logger: {
    info: (message: string) => void;
    error: (message: string) => void;
  };

  constructor() {
    this._app = express()
      .use(cookieParser())
      .use(
        morgan('dev', {
          skip: (req) => req.method === 'OPTIONS',
          stream: { write: (message) => console.log(message + '\n\n') },
        })
      );

    this.logger = {
      info: this.info,
      error: this.error,
    };
  }

  protected error(message: string) {
    console.log(`[${chalk.red('ERROR')}] `, message);
  }
  protected info(message: string) {
    console.log(`[${chalk.blue('INFO')}] `, message);
  }

  protected get app(): Application {
    return this._app;
  }

  start(): void {
    this._app.listen(PORT, () =>
      this.logger.info(
        `Server started at http://localhost:${PORT}/graphql` + '\n'
      )
    );
  }
}
