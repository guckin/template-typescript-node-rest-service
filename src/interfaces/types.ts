import {AdaptsExpressObjects} from './adaptsExpressObjects';
import {ProvidesExpressApplication} from './providesExpressApplication';

export const TYPES = {
    WrapsHttpFramework: Symbol('WrapsHttpFramework'),
    AppInterface: Symbol('AppInterface'),
    RoutingHandlers: Symbol('RoutingHandlers'),
    ProvidesExpressApplication: Symbol('ProvidesExpressApplication'),
    AdaptsExpressObjects: Symbol('AdaptsExpressObjects'),
    CanLogMessages: Symbol('CanLogMessages'),
    HandlesAuthentication: Symbol('HandlesAuthentication')
};
