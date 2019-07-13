import { f } from "./types";

export function pipe<T1>(a: T1): T1;
export function pipe<T1, T2>(a: T1, f1: f<T1, T2>): T2;
export function pipe<T1, T2, T3>(a: T1, f1: f<T1, T2>, f2: f<T2, T3>): T3;
export function pipe<T1, T2, T3, T4>(a: T1, f1: f<T1, T2>, f2: f<T2, T3>, f3: f<T3, T4>): T4;
export function pipe<T1, T2, T3, T4, T5>(a: T1, f1: f<T1, T2>, f2: f<T2, T3>, f3: f<T3, T4>, f4: f<T4, T5>): T5;
export function pipe<T1, T2, T3, T4, T5, T6>(a: T1, f1: f<T1, T2>, f2: f<T2, T3>, f3: f<T3, T4>, f4: f<T4, T5>, f5: f<T5, T6>): T6;
export function pipe(a: any, ...fs: Function[]) {
    return fs.reduce((prev, el) => el(prev), a);
}


