
import { writeFileSync } from "fs";
import { EOL } from "os";

export function generateFile(filePath: string, generatorFunction: Function, generatorOptions: any | any[]) {
    try {
        const options = Array.isArray(generatorOptions) ? generatorOptions : [generatorOptions];

        const content = options.map(o => generatorFunction(o)).join(EOL);
        //const generatedFilePath = path.join(path.dirname(filePath), `${path.parse(filePath).name}.generated.ts`);
        const generatedFilePath = filePath;
        writeFileSync(generatedFilePath, content);
        console.log(`File '${generatedFilePath}' generated ... `);
    } catch (err) {
        console.error(`Error while processing '${filePath}' file: `, err);
        throw err;
    }
}