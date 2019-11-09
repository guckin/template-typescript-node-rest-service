import {Application} from 'express-serve-static-core';
import {ApplicationStartConfiguration, WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {inject, injectable} from 'inversify';
import 'reflect-metadata';
import {HandlesRouting} from './interfaces/handlesRouting';
import {AdaptsExpressObjects} from './interfaces/adaptsExpressObjects';
import {ProvidesExpressApplication} from './interfaces/providesExpressApplication';
import {TYPES} from './interfaces/types';
import {CanLogMessages} from './interfaces/logger';
import {HandlesAuthentication} from './interfaces/handlesAuthentication';


@injectable()
export class ExpressWrapper implements WrapsHttpFramework {

    private readonly app: Application;

    constructor(
        @inject(TYPES.ProvidesExpressApplication)
        expressAppFactory: ProvidesExpressApplication,
        @inject(TYPES.AdaptsExpressObjects)
        private readonly expressAdapter: AdaptsExpressObjects,
        @inject(TYPES.CanLogMessages)
        private readonly logger: CanLogMessages,
        @inject(TYPES.HandlesAuthentication)
        private readonly authService: HandlesAuthentication
    ) {
        this.app = expressAppFactory.getApp();
    }

    registerRoute(route: HandlesRouting) {
        this.app[route.verb](route.path, (req, res) => {
            const request = this.expressAdapter.adaptRequest(req);
            const response = this.expressAdapter.adaptResponse(res);
            if (route.authenticated) {
                this.authService.authenticationHandler(request, response);
            }
            route.handler(request, response);
        });
    }

    start({port, serverInitMessage}: ApplicationStartConfiguration): void {
        this.app.listen(port, () => {
            this.logger.log(serverInitMessage);
        });
    }
}
