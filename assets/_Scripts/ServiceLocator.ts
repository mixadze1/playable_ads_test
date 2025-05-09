export class ServiceLocator {

    private static services = new Map<string, any>();

    public static bind<T>(key: string, instance: T): void {
        if (this.services.has(key)) {
            console.warn(`Service with key ${key} is already registered!`);
            return;
        }
        this.services.set(key, instance);
    }

    public static get<T>(key: string): T {
        const service = this.services.get(key);
        if (!service) {
            throw new Error(`Service with key ${key} not found!`);
        }
        return service as T;
    }

    public static unregister(key: string): void {
        if (this.services.has(key)) {
            this.services.delete(key);
            console.log(`Service with key ${key} unregistered.`);
        } else {
            console.warn(`Service with key ${key} not found.`);
        }
    }
}
