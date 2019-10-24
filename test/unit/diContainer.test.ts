import {DiContainer} from '../../src/diContainer';
import {TYPES} from '../../src/interfaces/types';
import {App} from '../../src/app';
import {ExpressWrapper} from '../../src/expressWrapper';
import {AppRouting} from '../../src/appRouting';

describe('DiContainer', () => {

    it('Has injectable classes registered to it', () => {
        IsRegistered(TYPES.AppInterface, App);
        IsRegistered(TYPES.WrapsHttpFramework, ExpressWrapper);
        IsRegistered(TYPES.RegistersAppRouting, AppRouting);
    });

    function IsRegistered(injectionToken: any, concreteType: any) {
        const obj = DiContainer.get(injectionToken);
        expect(obj).toBeInstanceOf(concreteType);
    }
});
