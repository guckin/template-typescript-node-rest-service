export enum HttpVerb {
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    PATCH = 'patch',
    DELETE = 'delete'
}

export type Path = string;

// tslint:disable-next-line:no-empty-interface
export interface HttpRequest {
    body: any;
}

// tslint:disable-next-line:no-empty-interface
export interface HttpResponse {
    send(content: any): void;
}

export interface HandlesRouting {
    verb: HttpVerb;
    path: Path;
    handler: (req: HttpRequest, res: HttpResponse) => void;
}
