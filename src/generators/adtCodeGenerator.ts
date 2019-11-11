/** code generator for Algebraic Data Types  */
import { EOL } from "os";

export interface Options {
    typeImportsPath?: string;
    typeName: string;
    genArgs?: string[]
    filePathName: string;
    unionTagName: string;
    unions: Dictionary<Union | null>;
    additionalImports?: string[];
    // importedTypeName?: string;
}

export interface Dictionary<T> {
    [key: string]: T;
}

export type Union = {
    fields: Dictionary<string>;
    genArgsDeps?: string[];
};

export function generateAdtCode(options: Options) {
    // set default values
    options.genArgs = options.genArgs || [];
    options.unions = options.unions || [];
    options.additionalImports = options.additionalImports || [];

    for (const [unionName, union] of Object.entries(options.unions)) {
        if (union === null) {
            options.unions[unionName] = { fields: {}, genArgsDeps: [] };
        } else {
            union.genArgsDeps = union.genArgsDeps || [];
        }
    }

    const generateTypes = (unionName: string, union: Union, onlyUsedGenTypes: string, allGenTypes: string) => {
        return `export type ${options.typeName}_${unionName}${onlyUsedGenTypes} = UnionChoice<${options.typeName}${allGenTypes}, "${unionName}">;`;
    }
    const generateConsts = (unionName: string) => {
        return `export const ${unionName} = { ${options.unionTagName}: "${unionName}" } as ${options.typeName}_${unionName};`;
    }
    const generateConstructor = (unionName: string, union: Union, onlyUsedGenTypes: string, allGenTypes: string) => {
        const argsWithTypes = Object.entries(union.fields).map(([fieldName, fieldType]) => `${fieldName}: ${fieldType}`).join(", ");
        const args = Object.entries(union.fields).map(([fieldName]) => fieldName).join(", ");
        return `export const ${unionName} = ${onlyUsedGenTypes}(${argsWithTypes}) => ({ ${options.unionTagName}: "${unionName}", ${args} }) as ${options.typeName}_${unionName}${onlyUsedGenTypes};`;
    }

    let content = `// ** this code was generated automatically **
${options.typeImportsPath ? `import { UnionChoice } from "${options.typeImportsPath}";` : ""}
import { ${options.typeName} } from "${options.filePathName}";
${options.additionalImports.join(EOL)}

`;

    for (const [unionName, union] of Object.entries(options.unions) as [string, Union][]) {
        const allGenTypes = options.genArgs!.length === 0 ? "" :
            wrapWithGen(options.genArgs!.map(t => union.genArgsDeps!.find(tt => tt === t) || "never").join(", "));
        const onlyUsedGenTypes = union.genArgsDeps!.length === 0 ? "" :
            wrapWithGen(union.genArgsDeps!.join(", "));

        content += `${generateTypes(unionName, union, onlyUsedGenTypes, allGenTypes)}
`;

        content += `${Object.keys(union.fields).length === 0 ? generateConsts(unionName) : generateConstructor(unionName, union, onlyUsedGenTypes, allGenTypes)}
`;
    }

    return content;
}


function wrapWithGen(text: string) {
    return `<${text}>`;
}
