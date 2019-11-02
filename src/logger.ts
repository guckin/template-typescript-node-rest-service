import {CanLogMessages} from './interfaces/logger';
import {injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class Logger implements CanLogMessages {
    log(...args: any[]): void {
        // TODO: Implement
    }
}
