import {AuthHandler} from '../interfaces/authHandler';
import {HttpRequest, HttpResponse} from '../interfaces/handlesRouting';
import {HandlesAuthentication} from '../interfaces/handlesAuthentication';

export class AuthHandlerService implements AuthHandler {

    constructor(private readonly authService: HandlesAuthentication) {
    }

    authHandler(request: HttpRequest, response: HttpResponse): void {
        const token = request.headers.Authorization.replace('Bearer ', '');
        if (!this.authService.isAuthenticated(token)) {
            response.send(401);
        }
    }
}
