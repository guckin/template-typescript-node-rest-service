import {RouteCallback, HandlesRouting, HttpRequest, HttpResponse, HttpVerb} from '../interfaces/handlesRouting';
import {HttpFrameworkWrapperMock} from '../../test/mocks/expressWrapperMock';
import {AuthHandler} from '../interfaces/authHandler';
import {RoutingService} from '../../test/unit/services/routingService';


class AuthHandlerServiceMock implements AuthHandler {
    authHandler = jest.fn();
}

describe('RoutingService', () => {

    let authHandlerService: AuthHandlerServiceMock;
    let routingService: RoutingService;
    let httpFrameworkWrapper: HttpFrameworkWrapperMock;

    beforeEach(() => {
        authHandlerService = new AuthHandlerServiceMock();
        httpFrameworkWrapper = new HttpFrameworkWrapperMock();
        routingService = new RoutingService(authHandlerService, httpFrameworkWrapper);
    });

    it('Registers unauthenticated routes', () => {
        const handler = createUnAuthenticatedHandler();

        routingService.registerRoute(handler);

        expect(httpFrameworkWrapper.registerRoute).toHaveBeenCalledWith(handler.verb, handler.path, expect.any(Function));
        expectRouteToBeUnAuthenticated();
        expectRoutingHandlerCalled(handler);
    });

    it('Registers an authenticated Route', () => {
        const handler = createAuthenticatedHandler();

        routingService.registerRoute(handler);

        expect(httpFrameworkWrapper.registerRoute).toHaveBeenCalledWith(handler.verb, handler.path, expect.any(Function));
        expectRoutingHandlerCalled(handler);
        expectRouteToBeAuthenticated();
    });

    function expectRouteToBeAuthenticated() {
        const handler = getHandler();
        const mockRequest = {} as HttpRequest;
        const mockResponse = {} as HttpResponse;
        handler(mockRequest, mockResponse);
        expect(authHandlerService.authHandler).toHaveBeenCalledWith(mockRequest, mockResponse);
    }

    function expectRouteToBeUnAuthenticated() {
        const handler = getHandler();
        const mockRequest = {} as HttpRequest;
        const mockResponse = {} as HttpResponse;
        handler(mockRequest, mockResponse);
        expect(authHandlerService.authHandler).not.toHaveBeenCalled();
    }

    function expectRoutingHandlerCalled(originalHandler: HandlesRouting) {
        const routeCallback = getHandler();
        const mockRequest = {} as HttpRequest;
        const mockResponse = {} as HttpResponse;
        routeCallback(mockRequest, mockResponse);
        expect(originalHandler.routeCallback).toHaveBeenCalledWith(mockRequest, mockResponse);
    }

    function getHandler(): RouteCallback {
        return httpFrameworkWrapper.registerRoute.mock.calls[0][2];
    }

    function createAuthenticatedHandler(): HandlesRouting {
        return {
            authenticated: true,
            path: '/authorizedEndpoint',
            verb: HttpVerb.GET,
            routeCallback: jest.fn()
        };
    }

    function createUnAuthenticatedHandler(): HandlesRouting {
        return {
            authenticated: false,
            path: '/unAuthorizedEndpoint',
            verb: HttpVerb.GET,
            routeCallback: jest.fn()
        };
    }
});
