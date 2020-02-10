import { PartialDeepply, rest } from "./match";
import { Option, some, none } from "./option";
import { isUnion } from "./adt";

export function matchValue<T>(value: T, expected: PartialDeepply<T>): boolean {
    return matchValue_(value, expected);
}

function matchValue_(value: any, expected: any): boolean {
    if (value === expected) {
        return true;
    }
    if (Number.isNaN(expected)) {
        return Number.isNaN(value);
    }
    // 'expected' is not equal 'value' and it is one of the simple types
    let typeof_;
    if (expected === null || ((typeof_ = typeof expected) === "string") ||
        typeof_ === "boolean" || typeof_ === "number" || typeof_ === "undefined" ||
        typeof_ === "function" || typeof_ === "symbol") {
        return false;
    }
    // check if 'value' is null or undefined to protect the following code
    if (value === null || typeof value === "undefined") {
        return false;
    }

    const resultForArray = matchArray(value, expected);
    if (isUnion(resultForArray, "some")) {
        return resultForArray.value;
    }

    // treat 'expected' as an object
    return matchObject(value, expected);
}


function matchArray(value: any, expected: any): Option<boolean> {
    if (Array.isArray(expected)) {
        if (Array.isArray(value)) {
            if (expected.length === 0) { // empty array
                return some(value.length === 0);
            } else {
                const isFixedSize = expected[expected.length - 1] !== rest;
                // check size
                if (isFixedSize) {
                    if (value.length !== expected.length) {
                        return some(false);
                    }
                } else {
                    if (value.length < expected.length - 1) {
                        return some(false);
                    }
                }
                // check items inside array
                const lastIndex = expected.length - 1;
                for (let i = 0; i < expected.length; i++) {
                    if (i in expected) { // is not a hole
                        const expectedValue = expected[i];
                        const isLastRest = (i === lastIndex) && (expectedValue === rest);
                        if (!isLastRest) {
                            if (!matchValue_(value[i], expected[i])) {
                                return some(false);
                            }
                        }
                    }
                }
                return some(true);
            }
        }
        return some(false);
    }

    return none;
}

function matchObject(value: any, expected: any): boolean {
    for (const prop in expected) {
        if (!(prop in value)) {
            return false;
        }
        if (!matchValue(value[prop], expected[prop])) {
            return false;
        }
    }
    return true;
}