export abstract class extendedPersonService<T> {

    abstract mapToObject(any): T;

    abstract createViaObject(T): Promise<T>;

    abstract mapToDto(T): any;
}