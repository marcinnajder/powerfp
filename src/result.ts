import { f } from "./types";
import { MOps } from "./monad";
import { FunctorOperations } from "./functor";

// https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/results

const resultOps: Pick<Result<any, any>, "bind" | "map"> = {
    bind(f) {
        return bind_(this as any, f);
    },
    map(f) {
        return map_(this as any, f);
    }
};

export type Result<T = {}, TError = {}> = ({ type: "ok", value: T } | { type: "error", error: TError })
    & { bind<T2>(f: f<T, Result<T2, TError>>): Result<T2, TError> }
    & { map<T2>(f: f<T, T2>): Result<T2, TError> };

export type ResultS<T = {}> = Result<T, string>;

export function ok<T, TError = {}>(value: T): Result<T, TError> {
    return { ...resultOps, type: "ok", value };
}

export function error<TError, T = {}>(err: TError): Result<T, TError> {
    return { ...resultOps, type: "error", error: err };
}



function bind_<T1, T2, TError>(m: Result<T1, TError>, f: f<T1, Result<T2, TError>>): Result<T2, TError> {
    return m.type === "error" ? error<TError, T2>(m.error) : f(m.value);
}

function map_<T1, T2, TError>(m: Result<T1, TError>, f: f<T1, T2>): Result<T2, TError> {
    return m.type === "error" ? error<TError, T2>(m.error) : ok(f(m.value));
}



// function bind_<T1, T2, TError>(this: Result<T1, TError>, f: (value: T1) => Result<T2, TError>): Result<T2, TError> {
//   return this.type === "error" ? error<TError, T2>(this.error) : f(this.value);
// }

// export function map<T1 = {}, TError = {}, T2 = {}>(m: Result<T1, TError>, f: (value: T1) => T2): Result<T2, TError> {
//   return m.bind(v => ok(f(v)));
// }

export function map<T1 = {}, TError = {}, T2 = {}>(f: f<T1, T2>): f<Result<T1, TError>, Result<T2, TError>>;
export function map<T1 = {}, TError = {}, T2 = {}>(m: Result<T1, TError>, f: f<T1, T2>): Result<T2, TError>;
export function map(mf: any, f?: any): any {
    return f ? map_(mf, f) : (m: any) => map_(m, mf);
}

export function bind<T1 = {}, TError = {}, T2 = {}>(f: f<T1, Result<T2, TError>>): f<Result<T1, TError>, Result<T2, TError>>;
export function bind<T1 = {}, TError = {}, T2 = {}>(m: Result<T1, TError>, f: f<T1, Result<T2, TError>>): Result<T2, TError>;
export function bind(mf: any, f?: any): any {
    return f ? bind_(mf, f) : (m: any) => bind_(m, mf);
}

export function mapError<T = {}, TError1 = {}, TError2 = {}>(m: Result<T, TError1>, f: f<TError1, TError2>): Result<T, TError2> {
    return m.type === "error" ? error<TError2, T>(f(m.error)) : ok(m.value);
}


export const resultMonadOps: MOps = {
    return_<T>(value: T): Result<T> {
        return ok(value);
    },
    bind<T1, T2>(m: Result<T1>, f: (value: T1) => Result<T2>): Result<T2> {
        return m.bind(f);
    }
};


export const resultFunctorOps: FunctorOperations = {
    map<T1, T2>(m: Result<T1>, f: (value: T1) => T2): Result<T2> {
        return map(m, f);
    }
};
