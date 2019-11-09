import {HttpRequest, HttpResponse} from './handlesRouting';

export interface AuthHandler {
    authHandler(request: HttpRequest, response: HttpResponse): void;
}
