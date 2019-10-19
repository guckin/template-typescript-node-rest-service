import {WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {inject, injectable} from 'inversify';
import {TYPES} from './interfaces/types';
import 'reflect-metadata';

@injectable()
export class App {

    constructor(
        @inject(TYPES.WrapsHttpFramework) private readonly expressWrapper: WrapsHttpFramework
    ) {}

    start() {
        this.expressWrapper.start();
    }
}
