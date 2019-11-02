import {ExpressHttpResponseWrapper} from '../../src/expressHttpResponseWrapper';
import {Response as ExpressResponse} from 'express';
import {ExpressResponseMock} from '../mocks/expressResponseMock';

describe('ExpressHttpResponseWrapper', () => {

    let expressResponse: ExpressResponse;
    let httpRequest: ExpressHttpResponseWrapper;
    let expressResponseMock: ExpressResponseMock;

    beforeEach(() => {
        expressResponse = new ExpressResponseMock() as any;
        expressResponseMock = expressResponse as any;
        httpRequest = new ExpressHttpResponseWrapper(expressResponse);
    });

    it('Puts data in the request body', () => {
        const bodyData = '🦐';

        httpRequest.send(bodyData);

        expect(expressResponseMock.send).toBeCalledWith(bodyData);
    });

});
