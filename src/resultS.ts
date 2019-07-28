import { f3, f4, f5 } from "./types";
import { resultMapM, resultFilterM, resultReduceM, resultLiftA2, resultLiftA3, resultLiftA4, resultMonadOps } from "./fma.generated";
import { Result } from "./result";
import { do_ } from "./do";

export type ResultS<T> = Result<T, string>;

export function resultSMapM<T, R>(items: T[], f: (item: T) => ResultS<R>): ResultS<R[]> {
    return resultMapM(items, f);
}
export function resultSFilterM<T>(items: T[], f: (item: T) => ResultS<boolean>): ResultS<T[]> {
    return resultFilterM(items, f);
}
export function resultSReduceM<T, A>(items: T[], f: (prev: A, item: T) => ResultS<A>, seed: A): ResultS<A> {
    return resultReduceM(items, f, seed);
}


export function resultSLiftA2<T1, T2, R>(f: f3<T1, T2, R>, m1: ResultS<T1>, m2: ResultS<T2>): ResultS<R> {
    return resultLiftA2(f, m1, m2);
}
export function resultSLiftA3<T1, T2, T3, R>(f: f4<T1, T2, T3, R>, m1: ResultS<T1>, m2: ResultS<T2>, m3: ResultS<T3>): ResultS<R> {
    return resultLiftA3(f, m1, m2, m3);
}
export function resultSLiftA4<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>, m1: ResultS<T1>, m2: ResultS<T2>, m3: ResultS<T3>, m4: ResultS<T4>): ResultS<R> {
    return resultLiftA4(f, m1, m2, m3, m4);
}


export function resultSDo<T>(generator: () => Iterator<ResultS<T>>): ResultS<T> {
    return do_(resultMonadOps, generator);
}



