import {AdaptsExpressObjects} from './interfaces/adaptsExpressObjects';
import {HttpRequest, HttpResponse} from './interfaces/handlesRouting';
import {Request, Response} from 'express';
import {injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class ExpressAdapter implements AdaptsExpressObjects {

    adaptRequest(req: Request): HttpRequest {
        // TODO
        return undefined;
    }

    adaptResponse(res: Response): HttpResponse {
        // TODO
        return undefined;
    }

}
