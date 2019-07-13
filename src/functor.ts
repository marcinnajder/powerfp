import { f } from "./types";

export interface F<T> { }
export interface FOps {
    map<T, R>(m: F<T>, f: f<T, R>): F<R>;
}
