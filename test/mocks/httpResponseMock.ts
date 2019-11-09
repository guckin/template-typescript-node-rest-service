import {HttpResponse} from '../../src/interfaces/handlesRouting';

export class HttpResponseMock implements HttpResponse {
    send = jest.fn();
    status = jest.fn();
}
