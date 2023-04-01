import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { z } from 'zod';

// YAMLファイルからパラメータを読み込む
const yamlFilePath = 'continue.yml';
const yamlFile = fs.readFileSync(yamlFilePath, 'utf8');
const yamlData = yaml.load(yamlFile) as Record<string, unknown>;

// Zodスキーマのコード表現を生成する関数
function generateZodSchemaCode(parameters: Record<string, unknown>): string {
    let schemaCode = '{\n';

    for (const key in parameters) {
        const paramProperties = parameters[key] as Record<string, unknown>;
        const paramType = paramProperties['type'];

        schemaCode += `  ${key}: `;

        if (paramType === 'string') {
            schemaCode += 'z.string(),\n';
        } else if (paramType === 'number') {
            schemaCode += 'z.number(),\n';
        } else if (paramType === 'boolean') {
            schemaCode += 'z.boolean(),\n';
        } else {
            throw new Error(`Unsupported value type: ${paramType}`);
        }
    }

    schemaCode += '}';
    return schemaCode;
}

const parameters = yamlData['parameters'] as Record<string, unknown>;
const zodSchemaCode = generateZodSchemaCode(parameters);

// ZodスキーマをTypeScriptファイルに書き出す
const outputFilePath = 'schema.gen.ts'
const outputContent = `
import { z } from 'zod';

export const schema = z.object(${zodSchemaCode});
`;

fs.writeFileSync(outputFilePath, outputContent);

console.log(`Zod schema has been written to ${outputFilePath}`);
