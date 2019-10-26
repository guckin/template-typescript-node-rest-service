import {Application} from 'express-serve-static-core';
import {WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {inject, injectable} from 'inversify';
import 'reflect-metadata';
import {HandlesRouting} from './interfaces/handlesRouting';
import {AdaptsExpressObjects} from './interfaces/adaptsExpressObjects';
import {ProvidesExpressApplication} from './interfaces/providesExpressApplication';
import {TYPES} from './interfaces/types';


@injectable()
export class ExpressWrapper implements WrapsHttpFramework {

    private readonly app: Application;

    constructor(
        @inject(TYPES.ProvidesExpressApplication)
        expressAppFactory: ProvidesExpressApplication,
        @inject(TYPES.AdaptsExpressObjects)
        private readonly expressAdapter: AdaptsExpressObjects
    ) {
        this.app = expressAppFactory.getApp();
    }

    start() {
        // TODO
    }

    registerRoute(route: HandlesRouting) {
        this.app[route.verb](route.path, (req, res) => {
            route.handler(
                this.expressAdapter.adaptRequest(req),
                this.expressAdapter.adaptResponse(res)
            );
        });
    }
}
