import {ProvidesExpressApplication} from './interfaces/providesExpressApplication';
import {Application} from 'express-serve-static-core';
import {injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class ExpressProvider implements ProvidesExpressApplication {
    getApp(): Application {
        return undefined;
    }
}
