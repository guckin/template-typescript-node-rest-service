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
}

export interface HttpResponse {
    send(content: any): void;
}

export interface HandlesRouting {
    verb: HttpVerb;
    path: Path;
    handler: (req: HttpRequest, res: HttpResponse) => void;
}
