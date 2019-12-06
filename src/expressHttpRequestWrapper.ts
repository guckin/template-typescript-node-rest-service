import {HttpRequest} from './interfaces/handlesRouting';
import {Request as ExpressRequest} from 'express';

export class ExpressHttpRequestWrapper implements HttpRequest {

    constructor(private readonly request: ExpressRequest) {}

    get body(): any {
        return this.request.body;
    }

    get headers(): any {
        return this.request.headers;
    }
}
