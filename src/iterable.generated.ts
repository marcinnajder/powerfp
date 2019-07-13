// ** this code was generated automatically **
import iterable, { } from "./iterable";
const { return_, map, bind, apply} = iterable;
import { f, f3, f4, f5 } from "./types";
import { MOps } from "./monad";
import { FOps, F } from "./functor";
import { AOps, liftA2, liftA3, liftA4 } from "./applicative";
import { mapM, filterM, reduceM } from "./monadicFunctions";
import { callApply, callMap, callBind } from "./utils";
import { do__ } from "./do";

// functor, monad, applicative functor
export const iterableFunctorOps: FOps = { map };
export const iterableMonadOps: MOps = { return_, bind };
export const iterableApplicativeOps: AOps = { map, return_, apply };


// return, map, bind, apply
export function iterableReturn<T>(value: T): Iterable<T> {
    return return_(value);
}
export function iterableMap<T, R>(f: f<T, R>): f<Iterable<T>, Iterable<R>>;
export function iterableMap<T, R>(m: Iterable<T>, f: f<T, R>): Iterable<R>;
export function iterableMap(mf: any, f?: any): any {
    return callMap(map, mf, f);
}
export function iterableBind<T, R>(f: f<T, Iterable<R>>): f<Iterable<T>, Iterable<R>>;
export function iterableBind<T, R>(m: Iterable<T>, f: f<T, Iterable<R>>): Iterable<R>;
export function iterableBind(mf: any, f?: any): any {
    return callBind(bind, mf, f);
}
export function iterableApply<T, R>(f: Iterable<f<T, R>>, m: Iterable<T>): Iterable<R>;
export function iterableApply<T, R>(f: Iterable<f<T, R>>): f<Iterable<T>, Iterable<R>>;
export function iterableApply(f: any, m?: any): any {
    return callApply(apply, f, m);
}

// monadic functions
export function iterableMapM<T, R>(items: T[], f: (item: T) => Iterable<R>): Iterable<R[]> {
    return mapM(iterableMonadOps, items, f) as Iterable<R[]>;
}
export function iterableFilterM<T>(items: T[], f: (item: T) => Iterable<boolean>): Iterable<T[]> {
    return filterM(iterableMonadOps, items, f) as Iterable<T[]>;
}
export function iterableReduceM<T, A>(items: T[], f: (prev: A, item: T) => Iterable<A>, seed: A): Iterable<A> {
    return reduceM(iterableMonadOps, items, f, seed) as Iterable<A>;
}

// applicative functions
export function iterableLiftA2<T1, T2, R>(f: f3<T1, T2, R>, m1: Iterable<T1>, m2: Iterable<T2>): Iterable<R> {
    return liftA2(iterableApplicativeOps, f, m1, m2) as Iterable<R>;
}
export function iterableLiftA3<T1, T2, T3, R>(f: f4<T1, T2, T3, R>, m1: Iterable<T1>, m2: Iterable<T2>, m3: Iterable<T3>): Iterable<R> {
    return liftA3(iterableApplicativeOps, f, m1, m2, m3) as Iterable<R>;
}
export function iterableLiftA4<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>, m1: Iterable<T1>, m2: Iterable<T2>, m3: Iterable<T3>, m4: Iterable<T4>): Iterable<R> {
    return liftA4(iterableApplicativeOps, f, m1, m2, m3, m4) as Iterable<R>;
}

export function iterableDo<T>(generator: () => Iterator<Iterable<T>>): Iterable<T> {
    return do__(iterableMonadOps, generator);
}
