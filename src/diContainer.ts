import {Container} from 'inversify';
import {TYPES} from './interfaces/types';
import {AppInterface} from './interfaces/appInterface';
import {App} from './app';
import {WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {ExpressWrapper} from './expressWrapper';

const container = new Container();

container.bind<AppInterface>(TYPES.AppInterface).to(App);
container.bind<WrapsHttpFramework>(TYPES.WrapsHttpFramework).to(ExpressWrapper);

export const DiContainer = container;
