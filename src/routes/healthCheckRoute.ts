import {HandlesRouting, HttpRequest, HttpResponse, HttpVerb, Path} from '../interfaces/handlesRouting';

export class HealthCheckRoute implements HandlesRouting {
    path: Path = '/health';
    verb: HttpVerb = HttpVerb.GET;
    routeCallback(req: HttpRequest, res: HttpResponse) {
        res.status(200);
        res.send('👌');
    }
}
