import { generateFile } from "./generationUtils";
import { parseUnionTypes } from "./parser";
import { generateAdtCode, Options as AdtOptions } from "./adtCodeGenerator";
import { generateFpCode, Options as FmaOptions } from "./fmaCodeGenerator";
import { createSourceFile } from "typescript";

generateFile("./src/adt.generated.ts", generateAdtCode, [
    {
        typeImportsPath: "./types",
        typeName: "Option", filePathName: "./option", unionTagName: "type",
        ...(parseUnionTypes(createSourceFile, "./src/option.ts", [{ typeName: "Option", unionTagName: "type" }])["Option"])
    },
    {
        typeName: "Result", filePathName: "./result", unionTagName: "type",
        ...(parseUnionTypes(createSourceFile, "./src/result.ts", [{ typeName: "Result", unionTagName: "type" }])["Result"])
    },
    {
        typeName: "List", filePathName: "./list", unionTagName: "type",
        ...(parseUnionTypes(createSourceFile, "./src/list.ts", [{ typeName: "List", unionTagName: "type" }])["List"])
    },
    {
        typeName: "Tree", filePathName: "./tree", unionTagName: "type",
        ...(parseUnionTypes(createSourceFile, "./src/tree.ts", [{ typeName: "Tree", unionTagName: "type" }])["Tree"])
    },
] as AdtOptions[]);



//generateInsideFiles("./src/option.ts");

// generateFile("./src/option.generated.ts", generateFpCode, { name: "option", typeName: "Option", fileName: "option", importedTypeName: "Option" } as Options);
// generateFile("./src/result.generated.ts", generateFpCode, { name: "result", typeName: "Result", fileName: "result", importedTypeName: "Result", genArgs: ", E" } as Options);
// generateFile("./src/promise.generated.ts", generateFpCode, { name: "promise", typeName: "Promise", fileName: "promise" } as Options);
// generateFile("./src/array.generated.ts", generateFpCode, { name: "array", typeName: "Array", fileName: "array", doPostfix: "_" } as Options);
// generateFile("./src/iterable.generated.ts", generateFpCode, { name: "iterable", typeName: "Iterable", fileName: "iterable", doPostfix: "_" } as Options);
// generateFile("./src/observable.generated.ts", generateFpCode, { name: "observable", typeName: "Observable", fileName: "observable", doPostfix: "_", importedTypeName: "Observable" } as Options);
// generateFile("./src/io.generated.ts", generateFpCode, { name: "io", typeName: "IO", fileName: "io", importedTypeName: "IO" } as Options);



generateFile("./src/fma.generated.ts", generateFpCode, [
    { name: "option", typeName: "Option", fileName: "option", importedTypeName: "Option", generateTypesImport: true },
    , { name: "result", typeName: "Result", fileName: "result", importedTypeName: "Result", genArgs: ", E" },
    , { name: "promise", typeName: "Promise", fileName: "promise" },
    , { name: "array", typeName: "Array", fileName: "array", doPostfix: "_" },
    , { name: "iterable", typeName: "Iterable", fileName: "iterable", doPostfix: "_" },
    , { name: "observable", typeName: "Observable", fileName: "observable", doPostfix: "_", importedTypeName: "Observable" },
    , { name: "io", typeName: "IO", fileName: "io", importedTypeName: "IO" }
] as FmaOptions[]);

