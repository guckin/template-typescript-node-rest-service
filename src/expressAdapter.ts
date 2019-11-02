import {AdaptsExpressObjects} from './interfaces/adaptsExpressObjects';
import {HttpRequest, HttpResponse} from './interfaces/handlesRouting';
import {Request as ExpressRequest, Response as ExpressResponse} from 'express';
import {injectable} from 'inversify';
import 'reflect-metadata';
import {ExpressHttpRequestWrapper} from './expressHttpRequestWrapper';
import {ExpressHttpResponseWrapper} from './expressHttpResponseWrapper';

@injectable()
export class ExpressAdapter implements AdaptsExpressObjects {

    adaptRequest(req: ExpressRequest): HttpRequest {
        return new ExpressHttpRequestWrapper(req);
    }

    adaptResponse(res: ExpressResponse): HttpResponse {
        return new ExpressHttpResponseWrapper(res);
    }

}
