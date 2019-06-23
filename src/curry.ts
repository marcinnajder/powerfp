import { f2, cf2, f3, cf3, f4, cf4 } from "./types";

export function curry<T1, R>(f: f2<T1, R>): cf2<T1, R>;
export function curry<T1, T2, R>(f: f3<T1, T2, R>): cf3<T1, T2, R>;
export function curry<T1, T2, T3, R>(f: f4<T1, T2, T3, R>): cf4<T1, T2, T3, R>;
export function curry(f: Function): Function {
    return function cf(...args: any[]): any {
        return args.length >= f.length ? f(...args) : (...rest: any[]) => cf(...args, ...rest)
    }
}

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html