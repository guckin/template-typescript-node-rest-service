import {AdaptsExpressObjects} from '../../src/interfaces/adaptsExpressObjects';

export class ExpressAdapterMock implements AdaptsExpressObjects {
    adaptRequest = jest.fn();
    adaptResponse = jest.fn();
}
