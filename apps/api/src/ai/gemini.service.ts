import { BadRequestException, Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { generatedTripSchema } from 'src/utils/validations/generated-trip.schema';
import z from 'zod';

@Injectable()
export class GeminiService {
  private readonly ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  async generateTrip(prompt: string) {
    const jsonSchema = z.toJSONSchema(generatedTripSchema);

    const response = await this.ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: prompt,

      config: {
        responseMimeType: 'application/json',
        responseJsonSchema: jsonSchema,
      },
    });

    const raw = response.text;

    if (!raw) {
      throw new Error('Gemini returned an empty response');
    }

    const json: unknown = JSON.parse(raw);

    const result = generatedTripSchema.safeParse(json);

    if (!result.success) {
      throw new BadRequestException({
        message: 'Gemini returned invalid trip data',
        errors: z.treeifyError(result.error),
      });
    }

    return result.data;
  }
}
