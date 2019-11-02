import {CanLogMessages} from '../../src/interfaces/logger';

export class LoggerMock implements CanLogMessages {
    log = jest.fn();
}
