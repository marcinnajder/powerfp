// ** this code was generated automatically **
import observable, { Observable } from "./observable";
const { return_, map, bind, apply } = observable;
import { f, f3, f4, f5 } from "./types";
import { MOps } from "./monad";
import { FOps, F } from "./functor";
import { AOps, liftA2, liftA3, liftA4 } from "./applicative";
import { mapM, filterM, reduceM } from "./monadicFunctions";
import { callApply, callMap, callBind } from "./utils";
import { do__ } from "./do";

// functor, monad, applicative functor
export const observableFunctorOps: FOps = { map };
export const observableMonadOps: MOps = { return_, bind };
export const observableApplicativeOps: AOps = { map, return_, apply };


// return, map, bind, apply
export function observableReturn<T>(value: T): Observable<T> {
    return return_(value);
}
export function observableMap<T, R>(f: f<T, R>): f<Observable<T>, Observable<R>>;
export function observableMap<T, R>(m: Observable<T>, f: f<T, R>): Observable<R>;
export function observableMap(mf: any, f?: any): any {
    return callMap(map, mf, f);
}
export function observableBind<T, R>(f: f<T, Observable<R>>): f<Observable<T>, Observable<R>>;
export function observableBind<T, R>(m: Observable<T>, f: f<T, Observable<R>>): Observable<R>;
export function observableBind(mf: any, f?: any): any {
    return callBind(bind, mf, f);
}
export function observableApply<T, R>(f: Observable<f<T, R>>, m: Observable<T>): Observable<R>;
export function observableApply<T, R>(f: Observable<f<T, R>>): f<Observable<T>, Observable<R>>;
export function observableApply(f: any, m?: any): any {
    return callApply(apply, f, m);
}

// monadic functions
export function observableMapM<T, R>(items: T[], f: (item: T) => Observable<R>): Observable<R[]> {
    return mapM(observableMonadOps, items, f) as Observable<R[]>;
}
export function observableFilterM<T>(items: T[], f: (item: T) => Observable<boolean>): Observable<T[]> {
    return filterM(observableMonadOps, items, f) as Observable<T[]>;
}
export function observableReduceM<T, A>(items: T[], f: (prev: A, item: T) => Observable<A>, seed: A): Observable<A> {
    return reduceM(observableMonadOps, items, f, seed) as Observable<A>;
}

// applicative functions
export function observableLiftA2<T1, T2, R>(f: f3<T1, T2, R>, m1: Observable<T1>, m2: Observable<T2>): Observable<R> {
    return liftA2(observableApplicativeOps, f, m1, m2) as Observable<R>;
}
export function observableLiftA3<T1, T2, T3, R>(f: f4<T1, T2, T3, R>, m1: Observable<T1>, m2: Observable<T2>, m3: Observable<T3>): Observable<R> {
    return liftA3(observableApplicativeOps, f, m1, m2, m3) as Observable<R>;
}
export function observableLiftA4<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>, m1: Observable<T1>, m2: Observable<T2>, m3: Observable<T3>, m4: Observable<T4>): Observable<R> {
    return liftA4(observableApplicativeOps, f, m1, m2, m3, m4) as Observable<R>;
}

export function observableDo<T>(generator: () => Iterator<Observable<T>>): Observable<T> {
    return do__(observableMonadOps, generator);
}
