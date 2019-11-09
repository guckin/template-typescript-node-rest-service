import {RoutingServiceInterface} from '../../../src/interfaces/RoutingServiceInterface';
import {AuthHandler} from '../../../src/interfaces/authHandler';
import {HandlesRouting, HttpRequest, HttpResponse} from '../../../src/interfaces/handlesRouting';

export class RoutingService implements RoutingServiceInterface {
    constructor(
        private readonly authHandlerService: AuthHandler,
        private readonly httpFrameworkWrapper: any // TODO
    ) {
    }

    registerRoute(handler: HandlesRouting) {
        const newRouteHandler = (request: HttpRequest, response: HttpResponse) => {
            if (handler.authenticated) {
                this.authHandlerService.authHandler(request, response);
            }
            handler.routeCallback(request, response);
        };
        this.httpFrameworkWrapper.registerRoute(handler.verb, handler.path, newRouteHandler);
    }
}
