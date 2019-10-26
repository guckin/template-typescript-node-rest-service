import {Request as ExpressRequest, Response as ExpressResponse} from 'express';
import {HttpRequest, HttpResponse} from './handlesRouting';

export interface AdaptsExpressObjects {
    adaptRequest(req: ExpressRequest): HttpRequest;

    adaptResponse(res: ExpressResponse): HttpResponse;
}
