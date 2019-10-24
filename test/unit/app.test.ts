import {App} from '../../src/app';
import {HttpFrameworkWrapperMock} from '../mocks/expressWrapperMock';
import {AppRoutingMock} from '../mocks/appRoutingMock';

describe('App', () => {
    let httpFrameworkWrapper: HttpFrameworkWrapperMock;
    let routing: AppRoutingMock;
    let mockRoutes: any;
    let app: App;

    beforeEach(() => {
        httpFrameworkWrapper = new HttpFrameworkWrapperMock();
        routing = new AppRoutingMock();
        mockRoutes = [];
        routing.registeredRoutes.mockReturnValue(mockRoutes);
        app = new App(httpFrameworkWrapper, routing);
    });

    it('Starts the server', () => {
        app.start();

        expectAppStarted();
        expectRoutesRegistered();
    });

    function expectRoutesRegistered() {
        expect(httpFrameworkWrapper.registerRouting.mock.calls[0][0]).toBe(mockRoutes);
    }

    function expectAppStarted() {
        expect(httpFrameworkWrapper.start).toHaveBeenCalled();
    }
});
