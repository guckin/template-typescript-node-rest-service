import {HealthCheckRoute} from '../../../src/routes/healthCheckRoute';
import {HttpResponseMock} from '../../mocks/httpResponseMock';
import {HttpVerb} from '../../../src/interfaces/handlesRouting';

describe('HealthCheckRoute', () => {

    it('has the correct verb and path', () => {
        const route = new HealthCheckRoute();

        expect(route.path).toEqual('/health');
        expect(route.verb).toEqual(HttpVerb.GET);
    });

    it('returns a good message 👌', function () {
        const route = new HealthCheckRoute();
        const responseMock = new HttpResponseMock();

        route.handler(null, responseMock);

        expect(responseMock.send).toBeCalledWith('👌');
        expect(responseMock.status).toBeCalledWith(200);
    });

});
