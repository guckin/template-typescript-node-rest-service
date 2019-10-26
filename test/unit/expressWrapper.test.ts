import {ExpressMock, ExpressProviderMock} from '../mocks/expressProviderMock';
import {ExpressWrapper} from '../../src/expressWrapper';
import {HandlesRouting, HttpRequest, HttpResponse, HttpVerb} from '../../src/interfaces/handlesRouting';
import {Request as ExpressRequest, Response as ExpressResponse} from 'express';
import {ExpressAdapterMock} from '../mocks/expressAdapterMock';

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

    const expectedPath = '/path';
    const expectedRequest = {} as HttpRequest;
    const expectedResponse = {} as HttpResponse;

    beforeEach(() => {
        expressMock = new ExpressMock();
        expressProviderMock = new ExpressProviderMock(expressMock);
        expressAdapterMock = new ExpressAdapterMock();
        expressWrapper = new ExpressWrapper(expressProviderMock, expressAdapterMock);
        requestMock = {} as ExpressRequest;
        expressResponseMock = {} as ExpressResponse;
    });

    [
        HttpVerb.GET,
        HttpVerb.POST,
        HttpVerb.DELETE,
        HttpVerb.PATCH,
        HttpVerb.PUT
    ].forEach((verb) => {
        it(`Registers ${verb} route`, () => {
            setupExpressMock();
            setUpAdapterMock();

            expressWrapper.registerRoute(createSingleHandler(verb));

            expectCorrectPathPassed();
            expectTheActualRequestsResponseWerePassed();
            expectThatTheRequestAndResponseWereAdapted();
        });
    });

    function setupExpressMock() {
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
            handler: (req: HttpRequest, res: HttpResponse) => {
                actualRequest = req;
                actualResponse = res;
            },
            path: expectedPath,
            verb: verb
        };
    }
});
