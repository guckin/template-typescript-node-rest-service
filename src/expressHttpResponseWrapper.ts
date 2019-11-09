import {Response as ExpressResponse} from 'express';
import {HttpResponse} from './interfaces/handlesRouting';

export class ExpressHttpResponseWrapper implements HttpResponse {

    constructor(private readonly response: ExpressResponse) {}

    send(content: any): void {
        this.response.send(content);
    }

    status(code: number): void {
        this.response.status(code);
    }
}
