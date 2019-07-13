// ** this code was generated automatically **
import array, { } from "./array";
const { return_, map, bind, apply} = array;
import { f, f3, f4, f5 } from "./types";
import { MOps } from "./monad";
import { FOps, F } from "./functor";
import { AOps, liftA2, liftA3, liftA4 } from "./applicative";
import { mapM, filterM, reduceM } from "./monadicFunctions";
import { callApply, callMap, callBind } from "./utils";
import { do__ } from "./do";

// functor, monad, applicative functor
export const arrayFunctorOps: FOps = { map };
export const arrayMonadOps: MOps = { return_, bind };
export const arrayApplicativeOps: AOps = { map, return_, apply };


// return, map, bind, apply
export function arrayReturn<T>(value: T): Array<T> {
    return return_(value);
}
export function arrayMap<T, R>(f: f<T, R>): f<Array<T>, Array<R>>;
export function arrayMap<T, R>(m: Array<T>, f: f<T, R>): Array<R>;
export function arrayMap(mf: any, f?: any): any {
    return callMap(map, mf, f);
}
export function arrayBind<T, R>(f: f<T, Array<R>>): f<Array<T>, Array<R>>;
export function arrayBind<T, R>(m: Array<T>, f: f<T, Array<R>>): Array<R>;
export function arrayBind(mf: any, f?: any): any {
    return callBind(bind, mf, f);
}
export function arrayApply<T, R>(f: Array<f<T, R>>, m: Array<T>): Array<R>;
export function arrayApply<T, R>(f: Array<f<T, R>>): f<Array<T>, Array<R>>;
export function arrayApply(f: any, m?: any): any {
    return callApply(apply, f, m);
}

// monadic functions
export function arrayMapM<T, R>(items: T[], f: (item: T) => Array<R>): Array<R[]> {
    return mapM(arrayMonadOps, items, f) as Array<R[]>;
}
export function arrayFilterM<T>(items: T[], f: (item: T) => Array<boolean>): Array<T[]> {
    return filterM(arrayMonadOps, items, f) as Array<T[]>;
}
export function arrayReduceM<T, A>(items: T[], f: (prev: A, item: T) => Array<A>, seed: A): Array<A> {
    return reduceM(arrayMonadOps, items, f, seed) as Array<A>;
}

// applicative functions
export function arrayLiftA2<T1, T2, R>(f: f3<T1, T2, R>, m1: Array<T1>, m2: Array<T2>): Array<R> {
    return liftA2(arrayApplicativeOps, f, m1, m2) as Array<R>;
}
export function arrayLiftA3<T1, T2, T3, R>(f: f4<T1, T2, T3, R>, m1: Array<T1>, m2: Array<T2>, m3: Array<T3>): Array<R> {
    return liftA3(arrayApplicativeOps, f, m1, m2, m3) as Array<R>;
}
export function arrayLiftA4<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>, m1: Array<T1>, m2: Array<T2>, m3: Array<T3>, m4: Array<T4>): Array<R> {
    return liftA4(arrayApplicativeOps, f, m1, m2, m3, m4) as Array<R>;
}

export function arrayDo<T>(generator: () => Iterator<Array<T>>): Array<T> {
    return do__(arrayMonadOps, generator);
}
