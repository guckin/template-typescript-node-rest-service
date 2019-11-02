export class ExpressRequestMock {
    bodyMock = jest.fn();

    get body(): any {
        return this.bodyMock();
    }
}
