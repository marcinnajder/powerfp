
import { f } from "./types";

function return_<T>(value: T): Iterable<T> {
    return (function* () {
        yield value;
    })();
}
function map<T, R>(m: Iterable<T>, f: f<T, R>): Iterable<R> {
    return mapI(m, f);
}
function bind<T, R>(m: Iterable<T>, f: f<T, Iterable<R>>): Iterable<R> {
    return flatmapI(m, f);
}
function apply<T, R>(f: Iterable<f<T, R>>, m: Iterable<T>): Iterable<R> {
    return flatmapI(f, ff => mapI(m, ff));
}


export function* mapI<T, R>(m: Iterable<T>, f: f<T, R>): Iterable<R> {
    for (const item of m) {
        yield f(item);
    }
}

export function* flatmapI<T, R>(m: Iterable<T>, f: f<T, Iterable<R>>): Iterable<R> {
    for (const item of m) {
        yield* f(item);
    }
}

export default { return_, map, bind, apply };
