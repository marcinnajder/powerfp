import { UnionChoice, TypedObj, MatchTypedObj, f } from "./types";

export function isUnion<T extends TypedObj, Type extends T["type"]>(x: T, unionType: Type): x is UnionChoice<T, Type> {
    return x.type === unionType;
}

export function matchUnion<T extends TypedObj, R>(unionType: T, obj: MatchTypedObj<T, R>) {
    let matchingFunction: f<T, R> = obj[unionType.type];
    if (!matchingFunction) {
        matchingFunction = obj["_"];
        if (!matchingFunction) {
            throw new Error(`Matching union type failed: '${Object.keys(obj).join(",")}' type not found, only '${unionType.type}' types were specified`);
        }
    }
    return matchingFunction(unionType);
}
