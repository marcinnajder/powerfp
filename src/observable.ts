
import { f } from "./types";
import { Observable, of, forkJoin } from "rxjs";
import { map as rxmap, flatMap } from "rxjs/operators";

function return_<T>(value: T): Observable<T> {
    return of(value);
}
function map<T, R>(m: Observable<T>, f: f<T, R>): Observable<R> {
    return m.pipe(rxmap(y => f(y)));
}
function bind<T, R>(m: Observable<T>, f: f<T, Observable<R>>): Observable<R> {
    return m.pipe(flatMap(y => f(y)));
}
function apply<T, R>(f: Observable<f<T, R>>, m: Observable<T>): Observable<R> {
    return forkJoin(f, m).pipe(rxmap(([ff, mm]) => ff(mm)));        // parallel implementation
    //return f.pipe(flatMap(ff => m.pipe(rxmap(y => ff(y)))));      // sequence implementation
}

export { Observable };
export default { return_, map, bind, apply };
