import {HttpRequest} from './interfaces/handlesRouting';
import {Request as ExpressRequest} from 'express';

export class ExpressHttpRequestWrapper implements HttpRequest {

    constructor(private readonly request: ExpressRequest) {}

    body(): any {
        return this.request.body;
    }
}
