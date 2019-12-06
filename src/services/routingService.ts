import {RoutingServiceInterface} from '../interfaces/RoutingServiceInterface';
import {AuthHandler} from '../interfaces/authHandler';
import {HandlesRouting, HttpRequest, HttpResponse} from '../interfaces/handlesRouting';
import {WrapsHttpFramework} from '../interfaces/wrapsHttpFramework';

export class RoutingService implements RoutingServiceInterface {
    constructor(
        private readonly authHandlerService: AuthHandler,
        private readonly httpFrameworkWrapper: WrapsHttpFramework
    ) {
    }

    registerRoute(handler: HandlesRouting) {
        const newRouteHandler = (request: HttpRequest, response: HttpResponse) => {
            if (handler.authenticated) {
                this.authHandlerService.authHandler(request, response);
            }
            handler.routeCallback(request, response);
        };
        this.httpFrameworkWrapper.registerRoute({
            verb: handler.verb,
            path: handler.path,
            routeCallback: newRouteHandler
        });
    }
}
