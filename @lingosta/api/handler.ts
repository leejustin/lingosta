import {Configuration, OpenAIApi} from "openai";
import type {VercelRequest, VercelResponse} from '@vercel/node';

import {Language, mapRawTranslation, RawTranslation, Translation} from "@lingosta/common";


const configuration = new Configuration({
  organization: process.env.OPEN_API_ORGANIZATION_ID,
  apiKey: process.env.OPEN_API_SECRET_KEY,
});

const openai = new OpenAIApi(configuration);

const cleanResponse = (input: string): string => {
  const regex = /^.*?({.*}).*?$/s;
  const match = input.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return input;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {

  const temp = "En cada decisión que tomas, moldeas tu propio destino en un mundo lleno de oportunidades infinitas"

  const prompt = process.env.OPEN_API_PROMPT
    .replace("$SOURCE_LANGUAGE_NAME", "Spanish")
    .replace("$SOURCE_LANGUAGE", "es")
    .replace("$TARGET_LANGUAGE", "en")
    .replace("$SENTENCE", temp);

  const query = await openai.createCompletion({
    model: process.env.OPEN_API_MODEL,
    max_tokens: parseInt(process.env.OPEN_API_MAX_TOKENS),
    prompt: prompt,
  });

  const result = cleanResponse(query.data.choices[0].text);

  try {
    const rawTranslation: RawTranslation = JSON.parse(result);
    const translation: Translation = mapRawTranslation(temp, rawTranslation, Language.SPANISH);

    console.log(translation);
    return response.status(200).json(translation);
  } catch (e) {
    console.error(e);
    return response.status(500).json({
      error: "Failed to parse OpenAI response",
    });
  }
}