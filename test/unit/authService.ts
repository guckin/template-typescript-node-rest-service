import {HandlesAuthentication} from '../../src/interfaces/handlesAuthentication';
import {HttpRequest, HttpResponse} from '../../src/interfaces/handlesRouting';
import {injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class AuthService implements HandlesAuthentication {
    authenticationHandler(request: HttpRequest, response: HttpResponse) {
        // TODO: need to actually implement handler here
    }
}
