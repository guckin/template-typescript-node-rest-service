import {HandlesRouting, HttpRequest, HttpResponse, HttpVerb} from '../interfaces/handlesRouting';

export class AuthorizedRoute implements HandlesRouting {
    routeCallback: (req: HttpRequest, res: HttpResponse) => void;
    path: '/authorized';
    verb: HttpVerb.GET;
}
