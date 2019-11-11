// ** this code was generated automatically **
import { f, f3, f4, f5 } from "./types";
import { MOps } from "./monad";
import { FOps, F } from "./functor";
import { AOps, liftA2, liftA3, liftA4 } from "./applicative";
import { mapM, filterM, reduceM, liftM2, liftM3, liftM4} from "./monadicFunctions";
import { callApply, callMap, callBind } from "./utils";
import { do_, do__ } from "./do";

import option, { Option} from "./option";
const { return_: option__return_, map: option__map, bind: option__bind, apply:option__apply } = option;

// functor, monad, applicative functor
export const optionFunctorOps: FOps = { map: option__map };
export const optionMonadOps: MOps = { return_: option__return_, bind: option__bind };
export const optionApplicativeOps: AOps = { map: option__map, return_: option__return_, apply: option__apply };


// return, map, bind, apply
export function optionReturn<T>(value: T): Option<T> {
    return option__return_(value);
}
export function optionMap<T, R>(f: f<T, R>): f<Option<T>, Option<R>>;
export function optionMap<T, R>(m: Option<T>, f: f<T, R>): Option<R>;
export function optionMap(mf: any, f?: any): any {
    return callMap(option__map, mf, f);
}
export function optionBind<T, R>(f: f<T, Option<R>>): f<Option<T>, Option<R>>;
export function optionBind<T, R>(m: Option<T>, f: f<T, Option<R>>): Option<R>;
export function optionBind(mf: any, f?: any): any {
    return callBind(option__bind, mf, f);
}
export function optionApply<T, R>(f: Option<f<T, R>>, m: Option<T>): Option<R>;
export function optionApply<T, R>(f: Option<f<T, R>>): f<Option<T>, Option<R>>;
export function optionApply(f: any, m?: any): any {
    return callApply(option__apply, f, m);
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

export function optionLiftM2<T1, T2, R>(f: f3<T1, T2, R>, m1: Option<T1>, m2: Option<T2>): Option<R> {
    return liftM2(optionMonadOps, f, m1, m2) as Option<R>;
}
export function optionLiftM3<T1, T2, T3, R>(f: f4<T1, T2, T3, R>, m1: Option<T1>, m2: Option<T2>, m3: Option<T3>): Option<R> {
    return liftM3(optionMonadOps, f, m1, m2, m3) as Option<R>;
}
export function optionLiftM4<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>, m1: Option<T1>, m2: Option<T2>, m3: Option<T3>, m4: Option<T4>): Option<R> {
    return liftM4(optionMonadOps, f, m1, m2, m3, m4) as Option<R>;
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


// ** this code was generated automatically **
import result, { Result} from "./result";
const { return_: result__return_, map: result__map, bind: result__bind, apply:result__apply } = result;

// functor, monad, applicative functor
export const resultFunctorOps: FOps = { map: result__map };
export const resultMonadOps: MOps = { return_: result__return_, bind: result__bind };
export const resultApplicativeOps: AOps = { map: result__map, return_: result__return_, apply: result__apply };


// return, map, bind, apply
export function resultReturn<T, E>(value: T): Result<T, E> {
    return result__return_(value);
}
export function resultMap<T, R, E>(f: f<T, R>): f<Result<T, E>, Result<R, E>>;
export function resultMap<T, R, E>(m: Result<T, E>, f: f<T, R>): Result<R, E>;
export function resultMap(mf: any, f?: any): any {
    return callMap(result__map, mf, f);
}
export function resultBind<T, R, E>(f: f<T, Result<R, E>>): f<Result<T, E>, Result<R, E>>;
export function resultBind<T, R, E>(m: Result<T, E>, f: f<T, Result<R, E>>): Result<R, E>;
export function resultBind(mf: any, f?: any): any {
    return callBind(result__bind, mf, f);
}
export function resultApply<T, R, E>(f: Result<f<T, R>, E>, m: Result<T, E>): Result<R, E>;
export function resultApply<T, R, E>(f: Result<f<T, R>, E>): f<Result<T, E>, Result<R, E>>;
export function resultApply(f: any, m?: any): any {
    return callApply(result__apply, f, m);
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

export function resultLiftM2<T1, T2, R, E>(f: f3<T1, T2, R>, m1: Result<T1, E>, m2: Result<T2, E>): Result<R, E> {
    return liftM2(resultMonadOps, f, m1, m2) as Result<R, E>;
}
export function resultLiftM3<T1, T2, T3, R, E>(f: f4<T1, T2, T3, R>, m1: Result<T1, E>, m2: Result<T2, E>, m3: Result<T3, E>): Result<R, E> {
    return liftM3(resultMonadOps, f, m1, m2, m3) as Result<R, E>;
}
export function resultLiftM4<T1, T2, T3, T4, R, E>(f: f5<T1, T2, T3, T4, R>, m1: Result<T1, E>, m2: Result<T2, E>, m3: Result<T3, E>, m4: Result<T4, E>): Result<R, E> {
    return liftM4(resultMonadOps, f, m1, m2, m3, m4) as Result<R, E>;
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


// ** this code was generated automatically **
import promise, { } from "./promise";
const { return_: promise__return_, map: promise__map, bind: promise__bind, apply:promise__apply } = promise;

// functor, monad, applicative functor
export const promiseFunctorOps: FOps = { map: promise__map };
export const promiseMonadOps: MOps = { return_: promise__return_, bind: promise__bind };
export const promiseApplicativeOps: AOps = { map: promise__map, return_: promise__return_, apply: promise__apply };


// return, map, bind, apply
export function promiseReturn<T>(value: T): Promise<T> {
    return promise__return_(value);
}
export function promiseMap<T, R>(f: f<T, R>): f<Promise<T>, Promise<R>>;
export function promiseMap<T, R>(m: Promise<T>, f: f<T, R>): Promise<R>;
export function promiseMap(mf: any, f?: any): any {
    return callMap(promise__map, mf, f);
}
export function promiseBind<T, R>(f: f<T, Promise<R>>): f<Promise<T>, Promise<R>>;
export function promiseBind<T, R>(m: Promise<T>, f: f<T, Promise<R>>): Promise<R>;
export function promiseBind(mf: any, f?: any): any {
    return callBind(promise__bind, mf, f);
}
export function promiseApply<T, R>(f: Promise<f<T, R>>, m: Promise<T>): Promise<R>;
export function promiseApply<T, R>(f: Promise<f<T, R>>): f<Promise<T>, Promise<R>>;
export function promiseApply(f: any, m?: any): any {
    return callApply(promise__apply, f, m);
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

export function promiseLiftM2<T1, T2, R>(f: f3<T1, T2, R>, m1: Promise<T1>, m2: Promise<T2>): Promise<R> {
    return liftM2(promiseMonadOps, f, m1, m2) as Promise<R>;
}
export function promiseLiftM3<T1, T2, T3, R>(f: f4<T1, T2, T3, R>, m1: Promise<T1>, m2: Promise<T2>, m3: Promise<T3>): Promise<R> {
    return liftM3(promiseMonadOps, f, m1, m2, m3) as Promise<R>;
}
export function promiseLiftM4<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>, m1: Promise<T1>, m2: Promise<T2>, m3: Promise<T3>, m4: Promise<T4>): Promise<R> {
    return liftM4(promiseMonadOps, f, m1, m2, m3, m4) as Promise<R>;
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


// ** this code was generated automatically **
import array, { } from "./array";
const { return_: array__return_, map: array__map, bind: array__bind, apply:array__apply } = array;

// functor, monad, applicative functor
export const arrayFunctorOps: FOps = { map: array__map };
export const arrayMonadOps: MOps = { return_: array__return_, bind: array__bind };
export const arrayApplicativeOps: AOps = { map: array__map, return_: array__return_, apply: array__apply };


// return, map, bind, apply
export function arrayReturn<T>(value: T): Array<T> {
    return array__return_(value);
}
export function arrayMap<T, R>(f: f<T, R>): f<Array<T>, Array<R>>;
export function arrayMap<T, R>(m: Array<T>, f: f<T, R>): Array<R>;
export function arrayMap(mf: any, f?: any): any {
    return callMap(array__map, mf, f);
}
export function arrayBind<T, R>(f: f<T, Array<R>>): f<Array<T>, Array<R>>;
export function arrayBind<T, R>(m: Array<T>, f: f<T, Array<R>>): Array<R>;
export function arrayBind(mf: any, f?: any): any {
    return callBind(array__bind, mf, f);
}
export function arrayApply<T, R>(f: Array<f<T, R>>, m: Array<T>): Array<R>;
export function arrayApply<T, R>(f: Array<f<T, R>>): f<Array<T>, Array<R>>;
export function arrayApply(f: any, m?: any): any {
    return callApply(array__apply, f, m);
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

export function arrayLiftM2<T1, T2, R>(f: f3<T1, T2, R>, m1: Array<T1>, m2: Array<T2>): Array<R> {
    return liftM2(arrayMonadOps, f, m1, m2) as Array<R>;
}
export function arrayLiftM3<T1, T2, T3, R>(f: f4<T1, T2, T3, R>, m1: Array<T1>, m2: Array<T2>, m3: Array<T3>): Array<R> {
    return liftM3(arrayMonadOps, f, m1, m2, m3) as Array<R>;
}
export function arrayLiftM4<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>, m1: Array<T1>, m2: Array<T2>, m3: Array<T3>, m4: Array<T4>): Array<R> {
    return liftM4(arrayMonadOps, f, m1, m2, m3, m4) as Array<R>;
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


// ** this code was generated automatically **
import iterable, { } from "./iterable";
const { return_: iterable__return_, map: iterable__map, bind: iterable__bind, apply:iterable__apply } = iterable;

// functor, monad, applicative functor
export const iterableFunctorOps: FOps = { map: iterable__map };
export const iterableMonadOps: MOps = { return_: iterable__return_, bind: iterable__bind };
export const iterableApplicativeOps: AOps = { map: iterable__map, return_: iterable__return_, apply: iterable__apply };


// return, map, bind, apply
export function iterableReturn<T>(value: T): Iterable<T> {
    return iterable__return_(value);
}
export function iterableMap<T, R>(f: f<T, R>): f<Iterable<T>, Iterable<R>>;
export function iterableMap<T, R>(m: Iterable<T>, f: f<T, R>): Iterable<R>;
export function iterableMap(mf: any, f?: any): any {
    return callMap(iterable__map, mf, f);
}
export function iterableBind<T, R>(f: f<T, Iterable<R>>): f<Iterable<T>, Iterable<R>>;
export function iterableBind<T, R>(m: Iterable<T>, f: f<T, Iterable<R>>): Iterable<R>;
export function iterableBind(mf: any, f?: any): any {
    return callBind(iterable__bind, mf, f);
}
export function iterableApply<T, R>(f: Iterable<f<T, R>>, m: Iterable<T>): Iterable<R>;
export function iterableApply<T, R>(f: Iterable<f<T, R>>): f<Iterable<T>, Iterable<R>>;
export function iterableApply(f: any, m?: any): any {
    return callApply(iterable__apply, f, m);
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

export function iterableLiftM2<T1, T2, R>(f: f3<T1, T2, R>, m1: Iterable<T1>, m2: Iterable<T2>): Iterable<R> {
    return liftM2(iterableMonadOps, f, m1, m2) as Iterable<R>;
}
export function iterableLiftM3<T1, T2, T3, R>(f: f4<T1, T2, T3, R>, m1: Iterable<T1>, m2: Iterable<T2>, m3: Iterable<T3>): Iterable<R> {
    return liftM3(iterableMonadOps, f, m1, m2, m3) as Iterable<R>;
}
export function iterableLiftM4<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>, m1: Iterable<T1>, m2: Iterable<T2>, m3: Iterable<T3>, m4: Iterable<T4>): Iterable<R> {
    return liftM4(iterableMonadOps, f, m1, m2, m3, m4) as Iterable<R>;
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


// ** this code was generated automatically **
import io, { IO} from "./io";
const { return_: io__return_, map: io__map, bind: io__bind, apply:io__apply } = io;

// functor, monad, applicative functor
export const ioFunctorOps: FOps = { map: io__map };
export const ioMonadOps: MOps = { return_: io__return_, bind: io__bind };
export const ioApplicativeOps: AOps = { map: io__map, return_: io__return_, apply: io__apply };


// return, map, bind, apply
export function ioReturn<T>(value: T): IO<T> {
    return io__return_(value);
}
export function ioMap<T, R>(f: f<T, R>): f<IO<T>, IO<R>>;
export function ioMap<T, R>(m: IO<T>, f: f<T, R>): IO<R>;
export function ioMap(mf: any, f?: any): any {
    return callMap(io__map, mf, f);
}
export function ioBind<T, R>(f: f<T, IO<R>>): f<IO<T>, IO<R>>;
export function ioBind<T, R>(m: IO<T>, f: f<T, IO<R>>): IO<R>;
export function ioBind(mf: any, f?: any): any {
    return callBind(io__bind, mf, f);
}
export function ioApply<T, R>(f: IO<f<T, R>>, m: IO<T>): IO<R>;
export function ioApply<T, R>(f: IO<f<T, R>>): f<IO<T>, IO<R>>;
export function ioApply(f: any, m?: any): any {
    return callApply(io__apply, f, m);
}

// monadic functions
export function ioMapM<T, R>(items: T[], f: (item: T) => IO<R>): IO<R[]> {
    return mapM(ioMonadOps, items, f) as IO<R[]>;
}
export function ioFilterM<T>(items: T[], f: (item: T) => IO<boolean>): IO<T[]> {
    return filterM(ioMonadOps, items, f) as IO<T[]>;
}
export function ioReduceM<T, A>(items: T[], f: (prev: A, item: T) => IO<A>, seed: A): IO<A> {
    return reduceM(ioMonadOps, items, f, seed) as IO<A>;
}

export function ioLiftM2<T1, T2, R>(f: f3<T1, T2, R>, m1: IO<T1>, m2: IO<T2>): IO<R> {
    return liftM2(ioMonadOps, f, m1, m2) as IO<R>;
}
export function ioLiftM3<T1, T2, T3, R>(f: f4<T1, T2, T3, R>, m1: IO<T1>, m2: IO<T2>, m3: IO<T3>): IO<R> {
    return liftM3(ioMonadOps, f, m1, m2, m3) as IO<R>;
}
export function ioLiftM4<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>, m1: IO<T1>, m2: IO<T2>, m3: IO<T3>, m4: IO<T4>): IO<R> {
    return liftM4(ioMonadOps, f, m1, m2, m3, m4) as IO<R>;
}

// applicative functions
export function ioLiftA2<T1, T2, R>(f: f3<T1, T2, R>, m1: IO<T1>, m2: IO<T2>): IO<R> {
    return liftA2(ioApplicativeOps, f, m1, m2) as IO<R>;
}
export function ioLiftA3<T1, T2, T3, R>(f: f4<T1, T2, T3, R>, m1: IO<T1>, m2: IO<T2>, m3: IO<T3>): IO<R> {
    return liftA3(ioApplicativeOps, f, m1, m2, m3) as IO<R>;
}
export function ioLiftA4<T1, T2, T3, T4, R>(f: f5<T1, T2, T3, T4, R>, m1: IO<T1>, m2: IO<T2>, m3: IO<T3>, m4: IO<T4>): IO<R> {
    return liftA4(ioApplicativeOps, f, m1, m2, m3, m4) as IO<R>;
}

export function ioDo<T>(generator: () => Iterator<IO<T>>): IO<T> {
    return do_(ioMonadOps, generator);
}
