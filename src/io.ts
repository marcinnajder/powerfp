// todo: 
import { f } from "./types";

export type IO<T> = () => T;

function return_<T>(value: T): IO<T> {
    return () => value;
}
function map<T, R>(m: IO<T>, f: f<T, R>): IO<R> {
    return () => f(m());
}
function bind<T, R>(m: IO<T>, f: f<T, IO<R>>): IO<R> {
    return () => f(m())();
}
function apply<T, R>(f: IO<f<T, R>>, m: IO<T>): IO<R> {
    return () => f()(m());
}


export default { return_, map, bind, apply };