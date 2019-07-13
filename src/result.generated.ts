// ** this code was generated automatically **
import result, { Result} from "./result";
const { return_, map, bind, apply} = result;
import { f, f3, f4, f5 } from "./types";
import { MOps } from "./monad";
import { FOps, F } from "./functor";
import { AOps, liftA2, liftA3, liftA4 } from "./applicative";
import { mapM, filterM, reduceM } from "./monadicFunctions";
import { callApply, callMap, callBind } from "./utils";
import { do_ } from "./do";

// functor, monad, applicative functor
export const resultFunctorOps: FOps = { map };
export const resultMonadOps: MOps = { return_, bind };
export const resultApplicativeOps: AOps = { map, return_, apply };


// return, map, bind, apply
export function resultReturn<T, E>(value: T): Result<T, E> {
    return return_(value);
}
export function resultMap<T, R, E>(f: f<T, R>): f<Result<T, E>, Result<R, E>>;
export function resultMap<T, R, E>(m: Result<T, E>, f: f<T, R>): Result<R, E>;
export function resultMap(mf: any, f?: any): any {
    return callMap(map, mf, f);
}
export function resultBind<T, R, E>(f: f<T, Result<R, E>>): f<Result<T, E>, Result<R, E>>;
export function resultBind<T, R, E>(m: Result<T, E>, f: f<T, Result<R, E>>): Result<R, E>;
export function resultBind(mf: any, f?: any): any {
    return callBind(bind, mf, f);
}
export function resultApply<T, R, E>(f: Result<f<T, R>, E>, m: Result<T, E>): Result<R, E>;
export function resultApply<T, R, E>(f: Result<f<T, R>, E>): f<Result<T, E>, Result<R, E>>;
export function resultApply(f: any, m?: any): any {
    return callApply(apply, f, m);
}

// monadic functions
export function resultMapM<T, R, E>(items: T[], f: (item: T) => Result<R, E>): Result<R[], E> {
    return mapM(resultMonadOps, items, f) as Result<R[], E>;
}
export function resultFilterM<T, E>(items: T[], f: (item: T) => Result<boolean, E>): Result<T[], E> {
    return filterM(resultMonadOps, items, f) as Result<T[], E>;
}
export function resultReduceM<T, A, E>(items: T[], f: (prev: A, item: T) => Result<A, E>, seed: A): Result<A, E> {
    return reduceM(resultMonadOps, items, f, seed) as Result<A, E>;
}

// applicative functions
export function resultLiftA2<T1, T2, R, E>(f: f3<T1, T2, R>, m1: Result<T1, E>, m2: Result<T2, E>): Result<R, E> {
    return liftA2(resultApplicativeOps, f, m1, m2) as Result<R, E>;
}
export function resultLiftA3<T1, T2, T3, R, E>(f: f4<T1, T2, T3, R>, m1: Result<T1, E>, m2: Result<T2, E>, m3: Result<T3, E>): Result<R, E> {
    return liftA3(resultApplicativeOps, f, m1, m2, m3) as Result<R, E>;
}
export function resultLiftA4<T1, T2, T3, T4, R, E>(f: f5<T1, T2, T3, T4, R>, m1: Result<T1, E>, m2: Result<T2, E>, m3: Result<T3, E>, m4: Result<T4, E>): Result<R, E> {
    return liftA4(resultApplicativeOps, f, m1, m2, m3, m4) as Result<R, E>;
}

export function resultDo<T, E>(generator: () => Iterator<Result<T, E>>): Result<T, E> {
    return do_(resultMonadOps, generator);
}
