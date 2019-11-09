import {HandlesRouting, HttpRequest, HttpResponse, HttpVerb} from '../interfaces/handlesRouting';

export class AuthorizedRoute implements HandlesRouting {
    path: '/authorized';
    verb: HttpVerb.GET;
    routeCallback: (req: HttpRequest, res: HttpResponse) => void;
}
