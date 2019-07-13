import { f } from "./types";

function return_<T>(value: T): Array<T> {
    return [value];
}
function map<T, R>(m: Array<T>, f: f<T, R>): Array<R> {
    return m.map(f);
}
function bind<T, R>(m: Array<T>, f: f<T, Array<R>>): Array<R> {
    return flatmap(m, f);
}
function apply<T, R>(f: Array<f<T, R>>, m: Array<T>): Array<R> {
    return flatmap(f, ff => m.map(ff));
}

function flatmap<T, R>(m: Array<T>, f: f<T, Array<R>>): Array<R> {
    return m.map(f).reduce((p, c) => p.concat(c), []);
}

// Array.prototype.flatmap = function <T, T2>(this: Array<T>, f: (item: T) => T2[]): T2[] {
//     return this.map(f).reduce((p, c) => p.concat(c), []);
// };

export default { return_, map, bind, apply };
