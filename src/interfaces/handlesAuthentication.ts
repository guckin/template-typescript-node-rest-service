import {HttpRequest, HttpResponse} from './handlesRouting';

export interface HandlesAuthentication {
    authenticationHandler(request: HttpRequest, response: HttpResponse);
}
