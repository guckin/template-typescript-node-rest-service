import {WrapsHttpFramework} from './expressWrapper';


export class App {

    constructor(private readonly expressWrapper: WrapsHttpFramework) {}

    start() {
        this.expressWrapper.start();
    }
}
