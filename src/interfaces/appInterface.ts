import {ApplicationStartConfiguration} from './wrapsHttpFramework';

export interface AppInterface {
    start(config: ApplicationStartConfiguration): void;
}
