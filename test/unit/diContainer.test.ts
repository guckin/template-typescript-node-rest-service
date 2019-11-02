import {DiContainer} from '../../src/diContainer';
import {TYPES} from '../../src/interfaces/types';
import {App} from '../../src/app';
import {ExpressWrapper} from '../../src/expressWrapper';
import {AppRouting} from '../../src/appRouting';
import {ExpressProvider} from '../../src/expressProvider';
import {ExpressAdapter} from '../../src/expressAdapter';
import {Logger} from '../../src/logger';

describe('DiContainer', () => {

    it('Has injectable classes registered to it', () => {
        isRegistered(TYPES.AppInterface, App);
        isRegistered(TYPES.WrapsHttpFramework, ExpressWrapper);
        isRegistered(TYPES.ProvidesExpressApplication, ExpressProvider);
        isRegistered(TYPES.AdaptsExpressObjects, ExpressAdapter);
        isRegistered(TYPES.CanLogMessages, Logger);

        constantIsRegistered(TYPES.RoutingHandlers, AppRouting);
    });

    function isRegistered(injectionToken: symbol, concreteType: any) {
        const obj = DiContainer.get(injectionToken);
        expect(obj).toBeInstanceOf(concreteType);
    }

    function constantIsRegistered(injectionToken: symbol, constant: any) {
        const obj = DiContainer.get(injectionToken);
        expect(obj).toBe(constant);
    }
});
