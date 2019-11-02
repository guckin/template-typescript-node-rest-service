import {HandlesRouting, HttpRequest, HttpResponse, HttpVerb, Path} from './interfaces/handlesRouting';

export class HealthCheckRoute implements HandlesRouting {
    path: Path;
    verb: HttpVerb;
    handler(req: HttpRequest, res: HttpResponse) {

    }
}
