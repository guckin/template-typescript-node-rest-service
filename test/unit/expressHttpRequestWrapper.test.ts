import {ExpressHttpRequestWrapper} from '../../src/expressHttpRequestWrapper';
import {ExpressRequestMock} from '../mocks/expressRequestMock';
import {Request as ExpressRequest} from 'express';

describe('ExpressHttpRequestWrapper', () => {

    let expressRequest: ExpressRequest;
    let httpRequest: ExpressHttpRequestWrapper;

    beforeEach(() => {
        expressRequest = new ExpressRequestMock() as any;
        httpRequest = new ExpressHttpRequestWrapper(expressRequest);
    });

    it('Puts data in the request body', () => {
        expressRequestMock().body = '🦐';

        const result = httpRequest.body;

        expect(result).toEqual(expressRequestMock().body);
    });

    it('Its matches the headers on the request', () => {
        expressRequestMock().headers = {some: 'value'};

        const result = httpRequest.headers;

        expect(result).toEqual(expressRequestMock().headers);
    });

    function expressRequestMock(): ExpressRequestMock {
        return expressRequest as any;
    }
});
