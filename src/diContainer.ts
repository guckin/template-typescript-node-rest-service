import {Container} from 'inversify';
import {TYPES} from './interfaces/types';
import {AppInterface} from './interfaces/appInterface';
import {App} from './app';
import {WrapsHttpFramework} from './interfaces/wrapsHttpFramework';
import {ExpressWrapper} from './expressWrapper';
import {AppRouting} from './appRouting';
import {AdaptsExpressObjects} from './interfaces/adaptsExpressObjects';
import {ExpressAdapter} from './expressAdapter';
import {ProvidesExpressApplication} from './interfaces/providesExpressApplication';
import {ExpressProvider} from './expressProvider';
import {CanLogMessages} from './interfaces/logger';
import {Logger} from './logger';
import {RoutingHandlers} from './interfaces/handlesRouting';
import {HandlesAuthentication} from './interfaces/handlesAuthentication';
import {AuthService} from '../test/unit/authService';

const container = new Container();

container.bind<AppInterface>(TYPES.AppInterface).to(App);
container.bind<WrapsHttpFramework>(TYPES.WrapsHttpFramework).to(ExpressWrapper);
container.bind<RoutingHandlers>(TYPES.RoutingHandlers).toConstantValue(AppRouting);
container.bind<ProvidesExpressApplication>(TYPES.ProvidesExpressApplication).to(ExpressProvider);
container.bind<AdaptsExpressObjects>(TYPES.AdaptsExpressObjects).to(ExpressAdapter);
container.bind<CanLogMessages>(TYPES.CanLogMessages).to(Logger);
container.bind<HandlesAuthentication>(TYPES.HandlesAuthentication).to(AuthService);

export const DiContainer = container;
