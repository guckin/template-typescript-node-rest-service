export enum HttpVerb {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete'
}

export type Path = string;

export interface HttpRequest {
    body: any;
    headers: any;
}

export interface HttpResponse {
    send(content: any): void;
    status(code: number): void;
}

export interface HandlesRouting {
    authenticated?: boolean;
    verb: HttpVerb;
    path: Path;
    routeCallback: RouteCallback;
}

export type RouteCallback = (req: HttpRequest, res: HttpResponse) => void;

export type RoutingHandlers = HandlesRouting[];
