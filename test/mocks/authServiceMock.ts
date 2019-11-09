import {HandlesAuthentication} from '../../src/interfaces/handlesAuthentication';

export class AuthServiceMock implements HandlesAuthentication {
    authenticationHandler = jest.fn();
}
