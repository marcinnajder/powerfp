import { f } from "./types";

export function compose<T1, T2>(f1: f<T1, T2>): f<T1, T2>;
export function compose<T1, T2, T3>(f1: f<T1, T2>, f2: f<T2, T3>): f<T1, T3>;
export function compose<T1, T2, T3, T4>(f1: f<T1, T2>, f2: f<T2, T3>, f3: f<T3, T4>): f<T1, T4>;
export function compose<T1, T2, T3, T4, T5>(f1: f<T1, T2>, f2: f<T2, T3>, f3: f<T3, T4>, f4: f<T4, T5>): f<T1, T5>;
export function compose<T1, T2, T3, T4, T5, T6>(f1: f<T1, T2>, f2: f<T2, T3>, f3: f<T3, T4>, f4: f<T4, T5>, f5: f<T5, T6>): f<T1, T6>;
export function compose(...fs: Function[]): Function {
    //return fs.reduce((prev, el) => x => el(prev(x)));
    return x => fs.reduce((prev, el) => el(prev), x); // pipe
}

