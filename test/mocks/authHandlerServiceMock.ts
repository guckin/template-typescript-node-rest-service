import {AuthHandler} from '../../src/interfaces/authHandler';

export class AuthHandlerServiceMock implements AuthHandler {
    authHandler = jest.fn();
}
