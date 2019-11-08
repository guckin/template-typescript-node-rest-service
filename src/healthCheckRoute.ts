import {HandlesRouting, HttpRequest, HttpResponse, HttpVerb, Path} from './interfaces/handlesRouting';

export class HealthCheckRoute implements HandlesRouting {
    path: Path = '/health';
    verb: HttpVerb = HttpVerb.GET;
    handler(req: HttpRequest, res: HttpResponse) {
        res.send('👌');
    }
}
