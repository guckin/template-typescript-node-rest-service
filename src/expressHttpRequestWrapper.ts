import {HttpRequest} from './interfaces/handlesRouting';
import {Request as ExpressRequest} from 'express';

export class ExpressHttpRequestWrapper implements HttpRequest {
    // TODO: implement this
    body: any;

    constructor(private readonly request: ExpressRequest) {}

}
