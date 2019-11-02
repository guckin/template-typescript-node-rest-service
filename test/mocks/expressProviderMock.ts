import {ProvidesExpressApplication} from '../../src/interfaces/providesExpressApplication';

export class ExpressMock {
    get = jest.fn();
    post = jest.fn();
    delete = jest.fn();
    patch = jest.fn();
    put = jest.fn();
    listen = jest.fn((_: any, cb: any) => {
        cb();
    });
}

export class ExpressProviderMock implements ProvidesExpressApplication {

    getApp = jest.fn();

    constructor(app: ExpressMock) {
        this.getApp.mockReturnValue(app);
    }
}
