import {Application} from 'express-serve-static-core';
import {ApplicationStartConfiguration, WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {inject, injectable} from 'inversify';
import 'reflect-metadata';
import {HandlesRouting} from './interfaces/handlesRouting';
import {AdaptsExpressObjects} from './interfaces/adaptsExpressObjects';
import {ProvidesExpressApplication} from './interfaces/providesExpressApplication';
import {TYPES} from './interfaces/types';
import {CanLogMessages} from './interfaces/logger';


@injectable()
export class ExpressWrapper implements WrapsHttpFramework {

    private readonly app: Application;

    constructor(
        @inject(TYPES.ProvidesExpressApplication)
        expressAppFactory: ProvidesExpressApplication,
        @inject(TYPES.AdaptsExpressObjects)
        private readonly expressAdapter: AdaptsExpressObjects,
        @inject(TYPES.CanLogMessages)
        private readonly logger: CanLogMessages
    ) {
        this.app = expressAppFactory.getApp();
    }

    registerRoute(route: HandlesRouting) {
        debugger;
        this.app[route.verb](route.path, (req, res) => {
            route.handler(
                this.expressAdapter.adaptRequest(req),
                this.expressAdapter.adaptResponse(res)
            );
        });
    }

    start({port, serverInitMessage}: ApplicationStartConfiguration): void {
        this.app.listen(port, () => {
            this.logger.log(serverInitMessage);
        });
    }
}
