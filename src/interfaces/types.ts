import {AdaptsExpressObjects} from './adaptsExpressObjects';
import {ProvidesExpressApplication} from './providesExpressApplication';

export const TYPES = {
    WrapsHttpFramework: Symbol('WrapsHttpFramework'),
    AppInterface: Symbol('AppInterface'),
    RegistersAppRouting: Symbol('RegistersAppRouting'),
    ProvidesExpressApplication: Symbol('ProvidesExpressApplication'),
    AdaptsExpressObjects: Symbol('AdaptsExpressObjects'),
    CanLogMessages: Symbol('CanLogMessages')
};
