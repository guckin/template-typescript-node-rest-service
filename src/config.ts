import {ApplicationStartConfiguration} from './interfaces/wrapsHttpFramework';

export default new class implements ApplicationStartConfiguration {
    port = Number(process.env.APPLICATION_PORT) || 8080;
    serverInitMessage = `Server running🏃 on port ${this.port}...`;
};
