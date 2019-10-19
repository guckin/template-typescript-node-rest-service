import {WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class ExpressWrapper implements WrapsHttpFramework {
    start() {
        console.log('started');
        // TODO: do something
    }
}
