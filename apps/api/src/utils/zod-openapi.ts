import z from 'zod';
import type { SchemaObject } from '@nestjs/swagger';

export const toOpenApiSchema = (
  schema: z.ZodType,
  io: 'input' | 'output' = 'input',
): SchemaObject =>
  z.toJSONSchema(schema, {
    io,
    target: 'openapi-3.0',
    unrepresentable: 'any',
    override: ({ zodSchema, jsonSchema }) => {
      if (zodSchema._zod.def.type === 'date') {
        jsonSchema.type = 'string';
        jsonSchema.format = 'date-time';
      }
    },
  }) as unknown as SchemaObject;
