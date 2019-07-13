// ** this code was generated automatically **
import option, { Option} from "./option";
const { return_, map, bind, apply} = option;
import { f, f3, f4, f5 } from "./types";
import { MOps } from "./monad";
import { FOps, F } from "./functor";
import { AOps, liftA2, liftA3, liftA4 } from "./applicative";
import { mapM, filterM, reduceM } from "./monadicFunctions";
import { callApply, callMap, callBind } from "./utils";
import { do_ } from "./do";

// functor, monad, applicative functor
export const optionFunctorOps: FOps = { map };
export const optionMonadOps: MOps = { return_, bind };
export const optionApplicativeOps: AOps = { map, return_, apply };


// return, map, bind, apply
export function optionReturn<T>(value: T): Option<T> {
    return return_(value);
}
export function optionMap<T, R>(f: f<T, R>): f<Option<T>, Option<R>>;
export function optionMap<T, R>(m: Option<T>, f: f<T, R>): Option<R>;
export function optionMap(mf: any, f?: any): any {
    return callMap(map, mf, f);
}
export function optionBind<T, R>(f: f<T, Option<R>>): f<Option<T>, Option<R>>;
export function optionBind<T, R>(m: Option<T>, f: f<T, Option<R>>): Option<R>;
export function optionBind(mf: any, f?: any): any {
    return callBind(bind, mf, f);
}
export function optionApply<T, R>(f: Option<f<T, R>>, m: Option<T>): Option<R>;
export function optionApply<T, R>(f: Option<f<T, R>>): f<Option<T>, Option<R>>;
export function optionApply(f: any, m?: any): any {
    return callApply(apply, f, m);
}

// monadic functions
export function optionMapM<T, R>(items: T[], f: (item: T) => Option<R>): Option<R[]> {
    return mapM(optionMonadOps, items, f) as Option<R[]>;
}
export function optionFilterM<T>(items: T[], f: (item: T) => Option<boolean>): Option<T[]> {
    return filterM(optionMonadOps, items, f) as Option<T[]>;
}
export function optionReduceM<T, A>(items: T[], f: (prev: A, item: T) => Option<A>, seed: A): Option<A> {
    return reduceM(optionMonadOps, items, f, seed) as Option<A>;
}

// applicative functions
export function optionLiftA2<T1, T2, R>(f: f3<T1, T2, R>, m1: Option<T1>, m2: Option<T2>): Option<R> {
    return liftA2(optionApplicativeOps, f, m1, m2) as Option<R>;
}
export function optionLiftA3<T1, T2, T3, R>(f: f4<T1, T2, T3, R>, m1: Option<T1>, m2: Option<T2>, m3: Option<T3>): Option<R> {
    return liftA3(optionApplicativeOps, f, m1, m2, m3) as Option<R>;
}
export function optionLiftA4<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>, m1: Option<T1>, m2: Option<T2>, m3: Option<T3>, m4: Option<T4>): Option<R> {
    return liftA4(optionApplicativeOps, f, m1, m2, m3, m4) as Option<R>;
}

export function optionDo<T>(generator: () => Iterator<Option<T>>): Option<T> {
    return do_(optionMonadOps, generator);
}
