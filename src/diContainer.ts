import {Container} from 'inversify';
import {TYPES} from './interfaces/types';
import {AppInterface} from './interfaces/appInterface';
import {App} from './app';
import {WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {ExpressWrapper} from './expressWrapper';
import {RegistersAppRouting} from './interfaces/registersAppRouting';
import {AppRouting} from './appRouting';
import {AdaptsExpressObjects} from './interfaces/adaptsExpressObjects';
import {ExpressAdapter} from './expressAdapter';
import {ProvidesExpressApplication} from './interfaces/providesExpressApplication';
import {ExpressProvider} from './expressProvider';
import {CanLogMessages} from './interfaces/logger';
import {Logger} from './logger';

const container = new Container();

container.bind<AppInterface>(TYPES.AppInterface).to(App);
container.bind<WrapsHttpFramework>(TYPES.WrapsHttpFramework).to(ExpressWrapper);
container.bind<RegistersAppRouting>(TYPES.RegistersAppRouting).to(AppRouting);
container.bind<ProvidesExpressApplication>(TYPES.ProvidesExpressApplication).to(ExpressProvider);
container.bind<AdaptsExpressObjects>(TYPES.AdaptsExpressObjects).to(ExpressAdapter);
container.bind<CanLogMessages>(TYPES.CanLogMessages).to(Logger);

export const DiContainer = container;
