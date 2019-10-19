import {WrapsHttpFramework} from '../../src/expressWrapper';

export class HttpFrameworkWrapperMock implements WrapsHttpFramework {
    start = jest.fn();
}
