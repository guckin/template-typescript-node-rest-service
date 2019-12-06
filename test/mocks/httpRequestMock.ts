import {HttpRequest} from '../../src/interfaces/handlesRouting';

export class HttpRequestMock implements HttpRequest {
    body: any;
    headers: any;
}
