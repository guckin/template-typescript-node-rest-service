import {HttpRequest} from './handlesRouting';

export interface HandlesAuthentication {
    isAuthenticated(request: HttpRequest): boolean;
}
