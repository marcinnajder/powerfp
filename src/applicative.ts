import { f, f3, f4, f5, ocf3, ocf4, ocf5 } from "./types";
import { FOps, F } from "./functor";
import { curryOnly } from "./curry";

export interface AOps extends FOps {
    return_<T>(value: T): F<T>;
    apply<T, R>(f: F<f<T, R>>, m: F<T>): F<R>;
}


export function liftA2<T1, T2, R>(ops: AOps, f: f3<T1, T2, R>, m1: F<T1>, m2: F<T2>): F<R> {
    const cf = curryOnly(f);
    return ops.apply(ops.map(m1, cf), m2);
}
export function liftA3<T1, T2, T3, R>(ops: AOps, f: f4<T1, T2, T3, R>, m1: F<T1>, m2: F<T2>, m3: F<T3>): F<R> {
    const cf = curryOnly(f);
    return ops.apply(ops.apply(ops.map(m1, cf), m2), m3);
}
export function liftA4<T1, T2, T3, T4, R>(ops: AOps, f: f5<T1, T2, T3, T4, R>, m1: F<T1>, m2: F<T2>, m3: F<T3>, m4: F<T4>): F<R> {
    const cf = curryOnly(f);
    return ops.apply(ops.apply(ops.map(m1, cf), m2), m3);
}

