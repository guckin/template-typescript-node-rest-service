import {AuthHandlerService} from '../../../src/services/authHandlerService';
import {HttpResponseMock} from '../../mocks/httpResponseMock';
import {HttpRequestMock} from '../../mocks/httpRequestMock';
import {AuthServiceMock} from '../../mocks/authServiceMock';

describe('authHandlerService', () => {

    let service: AuthHandlerService;
    let response: HttpResponseMock;
    let request: HttpRequestMock;
    let authService: AuthServiceMock;
    let token: string;

    beforeEach(() => {
        token = 'token';
        request = new HttpRequestMock();
        request.headers = {
            Authorization: `Bearer ${token}`
        };
        response = new HttpResponseMock();
        authService = new AuthServiceMock();
        service = new AuthHandlerService(authService);
    });

    it('Rejects the request when not authenticated', () => {
        authService.isAuthenticated.mockReturnValue(false);

        service.authHandler(request, response);

        expect(authService.isAuthenticated).toBeCalledWith(token);
        expect(response.send).toBeCalledWith(401);
    });

    it('Accepts the request when authenticated', () => {
        authService.isAuthenticated.mockReturnValue(true);

        service.authHandler(request, response);

        expect(authService.isAuthenticated).toBeCalledWith(token);
        expect(response.send).not.toBeCalled();
    });
});
