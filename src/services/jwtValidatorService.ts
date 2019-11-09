import {ValidatesTokens} from '../interfaces/validatesTokens';
import {injectable} from 'inversify';
import 'reflect-metadata';

@injectable()
export class JwtValidatorService implements ValidatesTokens {
    validate(): void {
    }
}
