import {WrapsHttpFramework} from '../../src/interfaces/wrapsHttpFramework';

export class HttpFrameworkWrapperMock implements WrapsHttpFramework {
    start = jest.fn();
    registerRouting = jest.fn();
}
