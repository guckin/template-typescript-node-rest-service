import {Response as ExpressResponse} from 'express';
import {HttpResponse} from './handlesRouting';

export class ExpressHttpResponseWrapper implements HttpResponse {

    constructor(private readonly response: ExpressResponse) {}

    send(content: any): void {

    }
}
