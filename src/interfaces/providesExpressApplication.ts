import {Application} from 'express-serve-static-core';

export interface ProvidesExpressApplication {
    getApp(): Application;
}
