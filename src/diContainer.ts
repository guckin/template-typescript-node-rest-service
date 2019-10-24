import {Container} from 'inversify';
import {TYPES} from './interfaces/types';
import {AppInterface} from './interfaces/appInterface';
import {App} from './app';
import {WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {ExpressWrapper} from './expressWrapper';
import {RegistersAppRouting} from './interfaces/registersAppRouting';
import {AppRouting} from './appRouting';

const container = new Container();

container.bind<AppInterface>(TYPES.AppInterface).to(App);
container.bind<WrapsHttpFramework>(TYPES.WrapsHttpFramework).to(ExpressWrapper);
container.bind<RegistersAppRouting>(TYPES.RegistersAppRouting).to(AppRouting);

export const DiContainer = container;
