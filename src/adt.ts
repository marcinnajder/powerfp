import { UnionChoice, TypedObj, MatchTypedObj, f, ValueOrFunc } from "./types";

export function isUnion<T extends TypedObj, Type extends T["type"]>(x: T, unionType: Type): x is UnionChoice<T, Type> {
    return x.type === unionType;
}

function callValueOrFunc<T, R>(value: ValueOrFunc<T, R>, unionType: T): R {
    return typeof value === "function" ? (value as f<T, R>)(unionType) : value;
}
export function matchUnion<T extends TypedObj, R>(unionType: T, obj: MatchTypedObj<T, R>): R {
    if (unionType.type in obj) {
        return callValueOrFunc(obj[unionType.type], unionType);
    } else if ("_" in obj) {
        return callValueOrFunc(obj["_"], unionType);
    } else {
        throw new Error(`Matching union type failed: '${Object.keys(obj).join(",")}' type not found, only '${unionType.type}' types were specified`);
    }



    // let matchingFunction: f<T, R> = obj[unionType.type];

    // if (!matchingFunction) {
    //     matchingFunction = obj["_"];
    //     if (!matchingFunction) {
    //         throw new Error(`Matching union type failed: '${Object.keys(obj).join(",")}' type not found, only '${unionType.type}' types were specified`);
    //     }
    // }

    // return matchingFunction(unionType);
}
