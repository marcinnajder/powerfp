
import * as ts from "typescript";
import * as fs from "fs";
import { Options, Union, Dictionary } from "./adtCodeGenerator";
import { Option, none, some, f } from "../index";

export type Input = Array<Pick<Options, "typeName" | "unionTagName">>;
export type Unions = Pick<Options, "unions">["unions"];
export type Output = Dictionary<Pick<Options, "unions" | "genArgs">>;

type TsNodeMapping = {
    [ts.SyntaxKind.TypeAliasDeclaration]: ts.TypeAliasDeclaration;
    [ts.SyntaxKind.IntersectionType]: ts.IntersectionTypeNode;
    [ts.SyntaxKind.UnionType]: ts.UnionTypeNode;
    [ts.SyntaxKind.PropertySignature]: ts.PropertySignature;
    [ts.SyntaxKind.Identifier]: ts.Identifier;
    [ts.SyntaxKind.LiteralType]: ts.LiteralTypeNode;
    [ts.SyntaxKind.TypeLiteral]: ts.TypeLiteralNode;
    [ts.SyntaxKind.StringLiteral]: ts.StringLiteral;
    [ts.SyntaxKind.ParenthesizedType]: ts.ParenthesizedTypeNode;
    [ts.SyntaxKind.TypeReference]: ts.TypeReferenceNode;
    [ts.SyntaxKind.ArrayType]: ts.ArrayTypeNode;
}

function isKind<K extends keyof TsNodeMapping>(typeNode: ts.Node, kind: K, doThrowError = false): typeNode is TsNodeMapping[K] {
    const result = typeNode.kind === kind;
    if (!result && doThrowError) {
        throw new Error(`Expected TS node of type '${kind}', but got '${typeNode.kind}' type`);
    }
    return result;
}

/**
 * The first argument ts_createSourceFile is a function and should be imported from the typescript module
 * ```import { createSourceFile } from "typescript";```
 * This trick prevents powerfp from having dependency for typescript module (and specific version of typescript)
 */
export function parseUnionTypes(ts_createSourceFile: Function, filePath: string, input: Input): Output {
    const result: Output = {};
    const fileContent = fs.readFileSync(filePath).toString();
    const tree = (ts.createSourceFile as typeof ts.createSourceFile)(filePath, fileContent, ts.ScriptTarget.ES2015, /*setParentNodes */ false);

    visitNode(tree);
    return result;

    function visitNode(node: ts.Node) {
        if (isKind(node, ts.SyntaxKind.TypeAliasDeclaration)) {
            const unionType = input.find(t => t.typeName === node.name.text);
            if (unionType) {
                const typeArguments = (node.typeParameters && node.typeParameters.map(a => a.name.text)) || [];
                result[unionType.typeName] = {
                    unions: findMembers(fileContent, node.type, typeArguments, unionType.unionTagName),
                    genArgs: typeArguments
                };
            }
        }
        else {
            ts.forEachChild(node, visitNode);
        }
    }
}

function findMembers(fileContent: string, typeNode: ts.Node, typeArguments: string[], unionTagName: string): Unions {
    const result: Unions = {};
    visitType(typeNode);
    return result;

    function visitType(node: ts.Node) {

        if (isKind(node, ts.SyntaxKind.ParenthesizedType)) {
            visitType(node.type);
        }
        if (isKind(node, ts.SyntaxKind.UnionType) || isKind(node, ts.SyntaxKind.IntersectionType)) {
            node.types.forEach(visitType);
        } else if (isKind(node, ts.SyntaxKind.TypeLiteral)) {
            const allProperties = [...choose(node.members, m => isKind(m, ts.SyntaxKind.PropertySignature) ? some(m) : none)];
            const [unionPropery] = [...choose(allProperties, m => isKind(m.name, ts.SyntaxKind.Identifier) && m.name.text === unionTagName &&
                m.type && isKind(m.type, ts.SyntaxKind.LiteralType) && isKind(m.type.literal, ts.SyntaxKind.StringLiteral)
                ? some({ property: m, literalType: m.type.literal }) : none)];

            if (unionPropery) { // only if tagged property exits
                const nonunionProperties = allProperties.filter(m => m !== unionPropery.property);
                if (nonunionProperties.length > 0) {  // only if properties other than tagged proprty exists
                    var union: Union = {
                        fields: nonunionProperties.reduce((agg, p) => {
                            const propertyName = (isKind(p.name, ts.SyntaxKind.Identifier, true) && p.name.text) || "";
                            const propertyType = (p.type && fileContent.substring(p.type.pos, p.type.end).trim()) || throwE("Property type is not specified");
                            agg[propertyName] = propertyType;
                            return agg;
                        }, {})
                    };

                    if (typeArguments.length > 0) { // only if type has any generic arguments
                        // in process of finding used type arguments only few syntaxes describing type are available 
                        // (:T, :List<T>, :List<List<T>>, T[] works, but : { a:T}, ... does not work)                        
                        const typeArgumentsAsTypeReference = choose(nonunionProperties, p =>
                            p.type && isKind(p.type, ts.SyntaxKind.TypeReference)
                                ? some(p.type)
                                : (p.type && isKind(p.type, ts.SyntaxKind.ArrayType) && isKind(p.type.elementType, ts.SyntaxKind.TypeReference)
                                    ? some(p.type.elementType)
                                    : none));
                        union.genArgsDeps = findUsedTypeArguments(typeArgumentsAsTypeReference, typeArguments);
                    }
                    result[unionPropery.literalType.text] = union;
                } else {
                    result[unionPropery.literalType.text] = null;
                }
            }
        }
    }

}


function findUsedTypeArguments(types: Iterable<ts.TypeReferenceNode>, searchedTypeArguments: string[]) {
    const foundTypes: string[] = [];
    const searchedTypeArgumentsSet = new Set(searchedTypeArguments);
    const allTypesNames = flatmap(types, findAllTypes);

    for (const typeName of allTypesNames) {
        if (searchedTypeArgumentsSet.has(typeName)) {
            searchedTypeArgumentsSet.delete(typeName);
            foundTypes.push(typeName);
            if (searchedTypeArgumentsSet.size == 0) {
                break;
            }
        }
    }

    return foundTypes;
}

function* findAllTypes(typeNode: ts.TypeReferenceNode): Iterable<string> {
    yield getIdentifierName(typeNode.typeName);
    if (typeNode.typeArguments) {
        const typeArgumentsAsTypeReferenceNodes = choose(typeNode.typeArguments, ss => isKind(ss, ts.SyntaxKind.TypeReference) ? some(ss) : none);
        for (const a of typeArgumentsAsTypeReferenceNodes) {
            yield* findAllTypes(a);
        }
    }
}

function getIdentifierName(node: ts.Node) {
    return (isKind(node, ts.SyntaxKind.Identifier, true) && node.text) || "";
}

function throwE<T>(error: any): T {
    throw error;
}

function* choose<T, R>(items: Iterable<T>, f: f<T, Option<R>>) {
    for (const item of items) {
        const value = f(item);
        if (value.type === "some") {
            yield value.value;
        }
    }
}

function* flatmap<T, R>(items: Iterable<T>, f: (item: T) => Iterable<R>): Iterable<R> {
    for (const item of items) {
        yield* f(item);
    }
}

function partition<T>(items: Iterable<T>, f: f<T, boolean>) {
    const result: [T[], T[]] = [[], []];
    for (const item of items) {
        result[f(item) ? 0 : 1].push(item);
    }
    return result;
}


// ************ alternatywna definicja mapowania AST dla TS

// type TsNodes__<K extends ts.SyntaxKind.IntersectionType> =
//     { type: K, node: TsMapping[K] }


// type TsNodes =
//     | { type: ts.SyntaxKind.IntersectionType, node: ts.IntersectionTypeNode }
//     | { type: ts.SyntaxKind.UnionType, node: ts.UnionTypeNode };


// function match<K extends TsNodes["type"], R>(typeNode: ts.Node, kind: K): UnionChoice2<TsNodes, K>["node"] {
//     return null as any;
// }
// export type TypedObj2<T> = { type: T };
// export type UnionChoice2<T extends { type: ts.SyntaxKind }, TT extends T["type"]> = Extract<T, { type: TT }>;
