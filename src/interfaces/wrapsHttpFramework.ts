export interface WrapsHttpFramework {
    start(): void;
    registerRouting(routes: any): void;
}
