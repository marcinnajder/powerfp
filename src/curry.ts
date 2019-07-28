import { f2, cf2, f3, cf3, f4, cf4, f5, cf5, ocf5, ocf4, ocf3, ocf2 } from "./types";

// Returns curried function supporting partial function application 
export function curry<T1, R>(f: f2<T1, R>): cf2<T1, R>;
export function curry<T1, T2, R>(f: f3<T1, T2, R>): cf3<T1, T2, R>;
export function curry<T1, T2, T3, R>(f: f4<T1, T2, T3, R>): cf4<T1, T2, T3, R>;
export function curry<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>): cf5<T1, T2, T3, T4, R>;
export function curry(f: Function): Function {
    return function cf(...args: any[]): any {
        return args.length >= f.length ? f(...args) : (...rest: any[]) => cf(...args, ...rest)
    }
}

// Returns curried function without partial function application
export function curryOnly<T1, R>(f: f2<T1, R>): ocf2<T1, R>;
export function curryOnly<T1, T2, R>(f: f3<T1, T2, R>): ocf3<T1, T2, R>;
export function curryOnly<T1, T2, T3, R>(f: f4<T1, T2, T3, R>): ocf4<T1, T2, T3, R>;
export function curryOnly<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>): ocf5<T1, T2, T3, T4, R>;
export function curryOnly(f: Function): Function {
    return function firstCall(a: any) {
        const args: any[] = [];
        return ocf(a);

        function ocf(arg: any): any {
            args.push(arg);
            return args.length >= f.length ? f(...args) : ocf;
        }
    }
}


// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html