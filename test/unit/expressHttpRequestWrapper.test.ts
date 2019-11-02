import {ExpressHttpRequestWrapper} from '../../src/expressHttpRequestWrapper';
import {ExpressRequestMock} from '../mocks/expressRequestMock';
import {Request as ExpressRequest} from 'express'

describe('ExpressHttpRequestWrapper', () => {

    let expressRequest: ExpressRequest;
    let httpRequest: ExpressHttpRequestWrapper;

    beforeEach(() => {
        expressRequest = new ExpressRequestMock() as any;
        httpRequest = new ExpressHttpRequestWrapper(expressRequest);
    });

    it('Puts data in the request body', () => {
        const bodyData = '🦐';
        expressRequestMock().bodyMock.mockReturnValue(bodyData);

        const result = httpRequest.body();

        expect(expressRequestMock().bodyMock).toBeCalled();
        expect(result).toEqual(bodyData);
    });

    function expressRequestMock(): ExpressRequestMock {
        return expressRequest as any;
    }
});
