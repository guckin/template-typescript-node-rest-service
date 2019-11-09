import {HandlesAuthentication} from '../interfaces/handlesAuthentication';
import {HttpRequest, HttpResponse} from '../interfaces/handlesRouting';
import {inject, injectable} from 'inversify';
import 'reflect-metadata';
import {ValidatesTokens} from '../interfaces/validatesTokens';
import {TYPES} from '../interfaces/types';

@injectable()
export class AuthService implements HandlesAuthentication {

    constructor(
        @inject(TYPES.ValidatesToken)
        private readonly validator: ValidatesTokens
    ) {}

    authenticationHandler(request: HttpRequest, response: HttpResponse) {

    }
}
