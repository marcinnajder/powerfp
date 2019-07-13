import { f } from "./types";

function return_<T>(value: T): Promise<T> {
    return Promise.resolve(value);
}
function map<T, R>(m: Promise<T>, f: f<T, R>): Promise<R> {
    return m.then(f);
}
function bind<T, R>(m: Promise<T>, f: f<T, Promise<R>>): Promise<R> {
    return m.then(f);
}
function apply<T, R>(f: Promise<f<T, R>>, m: Promise<T>): Promise<R> {
    return Promise.all([f, m]).then(([ff, mm]) => ff(mm));
}

export default { return_, map, bind, apply, Promise };
