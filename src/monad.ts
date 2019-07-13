import { f } from "./types";

export interface M<T> { }
export interface MOps {
    return_<T>(value: T): M<T>;
    bind<T, R>(m: M<T>, f: f<T, M<R>>): M<R>;
}
