import {HandlesAuthentication} from '../../src/interfaces/handlesAuthentication';

export class AuthServiceMock implements HandlesAuthentication {
    isAuthenticated = jest.fn();
}

