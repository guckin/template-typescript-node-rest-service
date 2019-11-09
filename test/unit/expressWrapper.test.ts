import {ExpressMock, ExpressProviderMock} from '../mocks/expressProviderMock';
import {ExpressWrapper} from '../../src/expressWrapper';
import {HandlesRouting, HttpRequest, HttpResponse, HttpVerb} from '../../src/interfaces/handlesRouting';
import {Request as ExpressRequest, Response as ExpressResponse} from 'express';
import {ExpressAdapterMock} from '../mocks/expressAdapterMock';
import {CanLogMessages} from '../../src/interfaces/logger';
import {LoggerMock} from '../mocks/loggerMock';
import {HandlesAuthentication} from '../../src/interfaces/handlesAuthentication';
import {AuthServiceMock} from '../mocks/authServiceMock';

describe('ExpressWrapper', () => {
    let expressMock: ExpressMock;
    let expressProviderMock: ExpressProviderMock;
    let expressWrapper: ExpressWrapper;
    let requestMock: ExpressRequest;
    let expressResponseMock: ExpressResponse;
    let expressAdapterMock: ExpressAdapterMock;
    let actualPath: string;
    let actualRequest: HttpRequest;
    let actualResponse: HttpResponse;
    let logger: CanLogMessages;
    let authService: HandlesAuthentication;

    const expectedPath = '/path';
    const expectedRequest = {} as HttpRequest;
    const expectedResponse = {} as HttpResponse;

    beforeEach(() => {
        expressMock = new ExpressMock();
        expressProviderMock = new ExpressProviderMock(expressMock);
        expressAdapterMock = new ExpressAdapterMock();
        authService = new AuthServiceMock();
        logger = new LoggerMock;
        expressWrapper = new ExpressWrapper(expressProviderMock, expressAdapterMock, logger, authService);
        requestMock = {} as ExpressRequest;
        expressResponseMock = {} as ExpressResponse;
        setupExpressMockForRouting();
        setUpAdapterMock();
    });

    [
        HttpVerb.GET,
        HttpVerb.POST,
        HttpVerb.DELETE,
        HttpVerb.PATCH,
        HttpVerb.PUT
    ].forEach((verb) => {
        it(`Registers ${verb} route`, () => {
            expressWrapper.registerRoute(createSingleHandler(verb));

            expectCorrectPathPassed();
            expectTheActualRequestsResponseWerePassed();
            expectThatTheRequestAndResponseWereAdapted();
        });
    });

    it('starts up the express App', () => {
        const port = 1992;
        const serverInitMessage = '🏃running...';

        expressWrapper.start({port, serverInitMessage});

        expect(expressMock.listen.mock.calls[0][0]).toEqual(port);
        expect(logger.log).toBeCalledWith(serverInitMessage);
    });

    it('handles authenticated routes', () => {
        expressWrapper.registerRoute(createAuthenticatedHandler());

        expect(authService.authenticationHandler).toBeCalledWith(expectedRequest, expectedResponse);
    });

    it('handles unauthenticated routes', () => {
        expressWrapper.registerRoute(createUnAuthenticatedHandler());

        expect(authService.authenticationHandler).not.toBeCalled();
    });

    function setupExpressMockForRouting() {
         const routeImpl = (path: any, cb: any) => {
             actualPath = path;
             cb(requestMock, expressResponseMock);
         };
        expressMock.get.mockImplementation(routeImpl);
        expressMock.post.mockImplementation(routeImpl);
        expressMock.delete.mockImplementation(routeImpl);
        expressMock.patch.mockImplementation(routeImpl);
        expressMock.put.mockImplementation(routeImpl);
    }

    function setUpAdapterMock() {
        expressAdapterMock.adaptRequest.mockReturnValue(expectedRequest);
        expressAdapterMock.adaptResponse.mockReturnValue(expectedResponse);
    }

    function expectThatTheRequestAndResponseWereAdapted() {
        expect(expressAdapterMock.adaptRequest).toBeCalledWith(expressResponseMock);
        expect(expressAdapterMock.adaptResponse).toBeCalledWith(expressResponseMock);
    }

    function expectTheActualRequestsResponseWerePassed() {
        expect(actualRequest).toBe(expectedRequest);
        expect(actualResponse).toBe(expectedResponse);
    }

    function expectCorrectPathPassed() {
        expect(actualPath).toEqual(expectedPath);
    }

    function createAuthenticatedHandler(): HandlesRouting {
        return {
            authenticated: true,
            path: '/authorizedEndpoint',
            verb: HttpVerb.GET,
            handler: (_req: HttpRequest, _res: HttpResponse) => undefined
        };
    }

    function createUnAuthenticatedHandler(): HandlesRouting {
        return {
            authenticated: false,
            path: '/unAuthorizedEndpoint',
            verb: HttpVerb.GET,
            handler: (_req: HttpRequest, _res: HttpResponse) => undefined
        };
    }

    function createSingleHandler(verb: HttpVerb): HandlesRouting {
        return {
            handler: (req: HttpRequest, res: HttpResponse) => {
                actualRequest = req;
                actualResponse = res;
            },
            path: expectedPath,
            verb: verb
        };
    }
});
