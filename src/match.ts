import { f, ValueOrFunc } from "./types";
import { Option, Option_some, Option_none } from "./option";
import { ResultS } from "./resultS";
import { matchValue } from "./matchValue";

export const rest: any = Symbol();

export type PartialDeepply<T> = {
    [P in keyof T]?: PartialDeepply<T[P]>;
}
export type CasePattern<T> = PartialDeepply<T> | f<T, boolean>;
export type CaseResult<T, R> = ValueOrFunc<T, R>;
export type Case<T, R> = [CasePattern<T>] | [CasePattern<T>, CaseResult<T, R>] | CaseResult<T, R>;

export function match<T, R>(value: T, ...cases: Case<T, R>[]): R {
    if (cases.length === 0) {
        throw new Error(`No cases passed to 'match' function `);
    }

    let patternIsMet = false;
    for (let case_ of cases) {
        if (Array.isArray(case_)) {
            const [pattern, result] = case_;
            if (patternIsMet) {
                if (case_.length === 2) {
                    return callResult(result!, value);
                }
            } else {
                if (callPattern(pattern, value)) {
                    if (case_.length === 2) {
                        return callResult(result!, value);
                    } else {
                        patternIsMet = true;
                    }
                }
            }
        } else {
            return callResult(case_, value);
        }
    }

    throw new Error(`No matching case found in 'match' function `);
}




function callPattern<T>(pattern: CasePattern<T>, value: T): boolean {
    return typeof pattern === "function" ? (pattern as f<T, boolean>)(value) : matchValue(value, pattern);
}


function callResult<T, R>(result: CaseResult<T, R>, value: T) {
    return typeof result === "function" ? (result as f<T, R>)(value) : result;
}


// uwagi:
// OR - jak to zrobic ? jesli drugi jest opcjonalny to zaczyna sie gryzc gdy podajemy __true__

// type Case2<T, R> =
//     | [CaseResult<T, R>]
//     | [CasePattern<T>, CaseResult<T, R>]
//     | [CasePattern<T>, CasePattern<T>, CaseResult<T, R>]
//     | [CasePattern<T>, CasePattern<T>, CasePattern<T>, CaseResult<T, R>]
//     | [CasePattern<T>, CasePattern<T>, CasePattern<T>, CasePattern<T>, CaseResult<T, R>]

// function match2<T, R>(value: T, ...cases: Case2<T, R>[]): R {
//     return {} as any as R;
// }

// type Pattern<T, X, R> =
//     [Partial2<T> | f<Partial2<T>, boolean>, f<T, R>?] | f<T, R>


// equals
// compare
// matchValue





