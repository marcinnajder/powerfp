export function add(a: number, b: number) {
    return a + b;
}
export function add3(a: number, b: number, c: number) {
    return a + b + c;
}
export function inc(a: number) {
    return a + 1;
}
export function toString_<T extends Object>(a: T) {
    return a.toString();
}
export function numberStringEqual(a: number, b: string) {
    return a.toString() === b;
}
export function delay<T>(duration: number, value: T): Promise<T> {
    return new Promise<T>((res, rej) => {
        setTimeout(() => {
            res(value);
        }, duration);
    });
}

