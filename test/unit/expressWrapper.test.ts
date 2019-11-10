import {ExpressMock, ExpressProviderMock} from '../mocks/expressProviderMock';
import {ExpressWrapper} from '../../src/expressWrapper';
import {HandlesRouting, HttpRequest, HttpResponse, HttpVerb} from '../../src/interfaces/handlesRouting';
import {Request as ExpressRequest, Response as ExpressResponse} from 'express';
import {ExpressAdapterMock} from '../mocks/expressAdapterMock';
import {CanLogMessages} from '../../src/interfaces/logger';
import {LoggerMock} from '../mocks/loggerMock';

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

    const expectedPath = '/path';
    const expectedRequest = {} as HttpRequest;
    const expectedResponse = {} as HttpResponse;

    beforeEach(() => {
        expressMock = new ExpressMock();
        expressProviderMock = new ExpressProviderMock(expressMock);
        expressAdapterMock = new ExpressAdapterMock();
        logger = new LoggerMock;
        expressWrapper = new ExpressWrapper(expressProviderMock, expressAdapterMock, logger);
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

    function createSingleHandler(verb: HttpVerb): HandlesRouting {
        return {
            routeCallback: (req: HttpRequest, res: HttpResponse) => {
                actualRequest = req;
                actualResponse = res;
            },
            path: expectedPath,
            verb: verb
        };
    }
});
