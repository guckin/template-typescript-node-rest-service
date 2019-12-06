import {HandlesAuthentication} from '../interfaces/handlesAuthentication';
import {inject, injectable} from 'inversify';
import 'reflect-metadata';
import {ValidatesTokens} from '../interfaces/validatesTokens';
import {TYPES} from '../interfaces/types';
import {HttpRequest} from '../interfaces/handlesRouting';

@injectable()
export class AuthService implements HandlesAuthentication {

    constructor(
        @inject(TYPES.ValidatesToken)
        private readonly validator: ValidatesTokens
    ) {}

    isAuthenticated(request: HttpRequest): boolean {
        return undefined;
    }
}
