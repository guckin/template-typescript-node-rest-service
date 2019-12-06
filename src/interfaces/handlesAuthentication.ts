export interface HandlesAuthentication {
    isAuthenticated(token: string): boolean;
}
