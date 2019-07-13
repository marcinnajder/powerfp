// ** this code was generated automatically **
import promise, { } from "./promise";
const { return_, map, bind, apply} = promise;
import { f, f3, f4, f5 } from "./types";
import { MOps } from "./monad";
import { FOps, F } from "./functor";
import { AOps, liftA2, liftA3, liftA4 } from "./applicative";
import { mapM, filterM, reduceM } from "./monadicFunctions";
import { callApply, callMap, callBind } from "./utils";
import { do_ } from "./do";

// functor, monad, applicative functor
export const promiseFunctorOps: FOps = { map };
export const promiseMonadOps: MOps = { return_, bind };
export const promiseApplicativeOps: AOps = { map, return_, apply };


// return, map, bind, apply
export function promiseReturn<T>(value: T): Promise<T> {
    return return_(value);
}
export function promiseMap<T, R>(f: f<T, R>): f<Promise<T>, Promise<R>>;
export function promiseMap<T, R>(m: Promise<T>, f: f<T, R>): Promise<R>;
export function promiseMap(mf: any, f?: any): any {
    return callMap(map, mf, f);
}
export function promiseBind<T, R>(f: f<T, Promise<R>>): f<Promise<T>, Promise<R>>;
export function promiseBind<T, R>(m: Promise<T>, f: f<T, Promise<R>>): Promise<R>;
export function promiseBind(mf: any, f?: any): any {
    return callBind(bind, mf, f);
}
export function promiseApply<T, R>(f: Promise<f<T, R>>, m: Promise<T>): Promise<R>;
export function promiseApply<T, R>(f: Promise<f<T, R>>): f<Promise<T>, Promise<R>>;
export function promiseApply(f: any, m?: any): any {
    return callApply(apply, f, m);
}

// monadic functions
export function promiseMapM<T, R>(items: T[], f: (item: T) => Promise<R>): Promise<R[]> {
    return mapM(promiseMonadOps, items, f) as Promise<R[]>;
}
export function promiseFilterM<T>(items: T[], f: (item: T) => Promise<boolean>): Promise<T[]> {
    return filterM(promiseMonadOps, items, f) as Promise<T[]>;
}
export function promiseReduceM<T, A>(items: T[], f: (prev: A, item: T) => Promise<A>, seed: A): Promise<A> {
    return reduceM(promiseMonadOps, items, f, seed) as Promise<A>;
}

// applicative functions
export function promiseLiftA2<T1, T2, R>(f: f3<T1, T2, R>, m1: Promise<T1>, m2: Promise<T2>): Promise<R> {
    return liftA2(promiseApplicativeOps, f, m1, m2) as Promise<R>;
}
export function promiseLiftA3<T1, T2, T3, R>(f: f4<T1, T2, T3, R>, m1: Promise<T1>, m2: Promise<T2>, m3: Promise<T3>): Promise<R> {
    return liftA3(promiseApplicativeOps, f, m1, m2, m3) as Promise<R>;
}
export function promiseLiftA4<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>, m1: Promise<T1>, m2: Promise<T2>, m3: Promise<T3>, m4: Promise<T4>): Promise<R> {
    return liftA4(promiseApplicativeOps, f, m1, m2, m3, m4) as Promise<R>;
}

export function promiseDo<T>(generator: () => Iterator<Promise<T>>): Promise<T> {
    return do_(promiseMonadOps, generator);
}
