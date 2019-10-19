import {DiContainer} from './diContainer';
import {AppInterface} from './interfaces/appInterface';
import {TYPES} from './interfaces/types';

const app = DiContainer.get<AppInterface>(TYPES.AppInterface);
app.start();
