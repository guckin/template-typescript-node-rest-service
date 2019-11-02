import {App} from '../../src/app';
import {HttpFrameworkWrapperMock} from '../mocks/expressWrapperMock';
import {AppRoutingMock} from '../mocks/appRoutingMock';
import {HandlesRouting} from '../../src/interfaces/handlesRouting';

describe('App', () => {
    let httpFrameworkWrapper: HttpFrameworkWrapperMock;
    let routing: AppRoutingMock;
    let mockRoutes: HandlesRouting[];
    let app: App;
    const config: any = {};

    beforeEach(() => {
        httpFrameworkWrapper = new HttpFrameworkWrapperMock();
        routing = new AppRoutingMock();
        mockRoutes = [{}, {}, {}] as HandlesRouting[];
        routing.registeredRoutes.mockReturnValue(mockRoutes);
        app = new App(httpFrameworkWrapper, routing);
    });

    it('Starts the server', () => {
        app.start(config);

        expectAppStarted();
        expectRoutesRegistered();
    });

    function expectRoutesRegistered() {
        httpFrameworkWrapper.registerRoute.mock.calls.forEach((call, index) => {
            expect(call[0]).toBe(mockRoutes[index]);
        });
    }

    function expectAppStarted() {
        expect(httpFrameworkWrapper.start).toHaveBeenCalledWith(config);
    }
});
