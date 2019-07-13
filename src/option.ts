import { f } from "./types";

export type Option<T> = ({ type: "some", value: T } | { type: "none" })
    & { map<R>(f: f<T, R>): Option<R> }
    & { bind<R>(f: f<T, Option<R>>): Option<R> };

// constructors
const optionOps: Option<any> = {
    bind(f) {
        return bind(this, f);
    }, map(f) {
        return map(this, f);
    },
    type: "none"
};
export function some<T>(value: T): Option<T> {
    return { ...optionOps, type: "some", value };
}
export function none<T>(): Option<T> {
    return { ...optionOps, type: "none" };
}


function return_<T>(value: T): Option<T> {
    return some(value);
}
function bind<T, R>(m: Option<T>, f: f<T, Option<R>>): Option<R> {
    return m.type === "none" ? none() : f(m.value);
}
function map<T, R>(m: Option<T>, f: f<T, R>): Option<R> {
    return m.type === "none" ? none() : some(f(m.value));
}
function apply<T, R>(f: Option<f<T, R>>, m: Option<T>): Option<R> {
    return f.type === "none" ? none() : map(m, f.value);
}



export default { return_, map, bind, apply };
