import {App} from '../../src/app';
import {HttpFrameworkWrapperMock} from '../mocks/expressWrapperMock';

describe('App', () => {
    it('starts the server', () => {
        const expressWrapper = new HttpFrameworkWrapperMock();
        const app = new App(expressWrapper);
        app.start();
        expect(expressWrapper.start).toHaveBeenCalled();
    });
});
