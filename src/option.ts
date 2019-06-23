import { f } from "./types";
import { MOps } from "./monad";
import { FunctorOperations } from "./functor";

const optionOps: Option<any> = {
    bind(f) {
        return bind_(this, f);
    }, map(f) {
        return map_(this, f);
    },
    type: "none"
};

export type Option<T = {}> = ({ type: "some", value: T } | { type: "none" })
    & { bind<T2>(f: f<T, Option<T2>>): Option<T2> }
    & { map<T2>(f: f<T, T2>): Option<T2> };


export function some<T>(value: T): Option<T> {
    return { ...optionOps, type: "some", value };
}
export function none<T>(): Option<T> {
    return { ...optionOps, type: "none" };
}


function bind_<T1, T2>(m: Option<T1>, f: (value: T1) => Option<T2>): Option<T2> {
    return m.type === "none" ? none<T2>() : f(m.value);
}
function map_<T1, T2>(m: Option<T1>, f: (value: T1) => T2): Option<T2> {
    return m.type === "none" ? none<T2>() : some(f(m.value));
}


export function map<T1, T2>(f: f<T1, T2>): f<Option<T1>, Option<T2>>;
export function map<T1, T2>(m: Option<T1>, f: f<T1, T2>): Option<T2>;
export function map(mf: any, f?: any): any {
    return f ? map_(mf, f) : (m: any) => map_(m, mf);
}

export function bind<T1, T2>(f: f<T1, Option<T2>>): f<Option<T1>, Option<T2>>;
export function bind<T1, T2>(m: Option<T1>, f: f<T1, Option<T2>>): Option<T2>;
export function bind(mf: any, f?: any): any {
    return f ? bind_(mf, f) : (m: any) => bind_(m, mf);
}


export const optionMonadOps: MOps = {
    return_<T>(value: T): Option<T> {
        return some(value);
    },
    bind<T1, T2>(m: Option<T1>, f: (value: T1) => Option<T2>): Option<T2> {
        // console.log(m);
        return m.bind(f);
    }
};


export const optionFunctorOps: FunctorOperations = {
    map<T1, T2>(m: Option<T1>, f: (value: T1) => T2): Option<T2> {
        return map(m, f);
    }
};