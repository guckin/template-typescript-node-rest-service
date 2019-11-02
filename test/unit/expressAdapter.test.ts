import {ExpressAdapter} from '../../src/expressAdapter';
import {Request as ExpressRequest, Response as ExpressResponse} from 'express';
import {ExpressHttpRequestWrapper} from '../../src/expressHttpRequestWrapper';
import {ExpressHttpResponseWrapper} from '../../src/interfaces/expressHttpResponseWrapper';
import {HttpRequest, HttpResponse} from '../../src/interfaces/handlesRouting';

describe('ExpressAdapter',  () => {
    let adapter: ExpressAdapter;

    const response = {} as ExpressResponse;
    const request = {} as ExpressRequest;

    beforeEach(() => {
        adapter = new ExpressAdapter();
    });

    it('Adapts the request', () => {
        const result = adapter.adaptRequest(request);

        expectToEqualRequest(result);
    });

    it('Adapts the response', () => {
        const result = adapter.adaptResponse(response);

        expectToEqualResponse(result);
    });

    function expectToEqualResponse(actualResponse: HttpResponse) {
        expect(actualResponse).toBeInstanceOf(ExpressHttpResponseWrapper);
        expect((actualResponse as any)['response']).toBe(response);
    }

    function expectToEqualRequest(actualRequest: HttpRequest) {
        expect(actualRequest).toBeInstanceOf(ExpressHttpRequestWrapper);
        expect((actualRequest as any)['request']).toBe(request);
    }
});
