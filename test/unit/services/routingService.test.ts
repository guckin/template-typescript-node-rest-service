import {HandlesRouting, HttpRequest, HttpResponse, HttpVerb, RouteCallback} from '../../../src/interfaces/handlesRouting';
import {HttpFrameworkWrapperMock} from '../../mocks/expressWrapperMock';
import {RoutingService} from '../../../src/services/routingService';
import {AuthHandlerServiceMock} from '../../mocks/authHandlerServiceMock';

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

        expect(httpFrameworkWrapper.registerRoute).toHaveBeenCalledWith({
            verb: handler.verb,
            path: handler.path,
            routeCallback: expect.any(Function)
        });
        expectRouteToBeUnAuthenticated();
        expectRoutingHandlerCalled(handler);
    });

    it('Registers an authenticated Route', () => {
        const handler = createAuthenticatedHandler();

        routingService.registerRoute(handler);

        expect(httpFrameworkWrapper.registerRoute).toHaveBeenCalledWith({
            verb: handler.verb,
            path: handler.path,
            routeCallback: expect.any(Function)
        });
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
        return httpFrameworkWrapper.registerRoute.mock.calls[0][0].routeCallback;
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
