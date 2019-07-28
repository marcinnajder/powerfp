import { f } from "./types";
import { ok as okGenerated, error as errorGenerated, Result_ok, Result_error } from "./adt.generated";
import { extendObjWithFunctionResult } from "./utils";

export { Result_ok, Result_error };
// https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/results
export type Result<T, E> = ({ type: "ok", value: T } | { type: "error", error: E })
    & { map<R>(f: f<T, R>): Result<R, E> }
    & { bind<R>(f: f<T, Result<R, E>>): Result<R, E> };


// constructors
const resultOps: Pick<Result<any, any>, "bind" | "map"> = {
    bind(f) {
        return bind(this as any, f);
    },
    map(f) {
        return map(this as any, f);
    }
};
// export function ok<T, E>(value: T): Result<T, E> {
//     return { ...resultOps, type: "ok", value };
// }
// export function error<T, E>(err: E): Result<T, E> {
//     return { ...resultOps, type: "error", error: err };
// }

export const ok = extendObjWithFunctionResult(resultOps, okGenerated);
export const error = extendObjWithFunctionResult(resultOps, errorGenerated);



function return_<T, E>(value: T): Result<T, E> {
    return ok(value);
}
function bind<T, R, E>(m: Result<T, E>, f: f<T, Result<R, E>>): Result<R, E> {
    return m.type === "error" ? error(m.error) : f(m.value);
}
function map<T, R, E>(m: Result<T, E>, f: f<T, R>): Result<R, E> {
    return m.type === "error" ? error(m.error) : ok(f(m.value));
}
function apply<T, R, E>(f: Result<f<T, R>, E>, m: Result<T, E>): Result<R, E> {
    return f.type === "error" ? error(f.error) : map(m, f.value);
}

export function resultMapError<T, E, ER>(m: Result<T, E>, f: f<E, ER>): Result<T, ER> {
    return m.type === "error" ? error(f(m.error)) : ok(m.value);
}

export default { return_, map, bind, apply };
