import { Configuration, OpenAIApi } from "openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  getLanguageName,
  Language,
  mapRawTranslation,
  RawTranslation,
  Translation,
  TranslationRequest
} from "@lingosta/common";


const configuration = new Configuration({
  organization: process.env.OPEN_API_ORGANIZATION_ID,
  apiKey: process.env.OPEN_API_SECRET_KEY,
});

const openai = new OpenAIApi(configuration);

// cleanResponse cleans up the OpenAPI response so that it can be properly serialized
const cleanResponse = (input: string): string => {
  // Remove all characters before the first `{` and after the last `}`
  const regex = /^.*?({.*}).*?$/s;
  const match = input.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return input;
};

export default async function translations(
  request: VercelRequest,
  response: VercelResponse,
) {
  const requestBody: TranslationRequest = request.body;

  const {sentence, type} = requestBody;

  const prompt: string = process.env.OPEN_API_PROMPT
    .replace("$SOURCE_LANGUAGE_NAME", getLanguageName(type))
    .replace("$SOURCE_LANGUAGE", type)
    .replace("$TARGET_LANGUAGE", Language.ENGLISH)
    .replace("$SENTENCE", sentence);

  const query = await openai.createCompletion({
    model: process.env.OPEN_API_MODEL,
    max_tokens: parseInt(process.env.OPEN_API_MAX_TOKENS),
    prompt: prompt,
  });

  const result: string = cleanResponse(query.data.choices[0].text);

  try {
    const rawTranslation: RawTranslation = JSON.parse(result);
    const translation: Translation = mapRawTranslation(sentence, rawTranslation, Language.SPANISH);

    console.log(translation);
    return response.status(200).json(translation);
  } catch (e) {
    console.error(e);
    return response.status(500).json({
      error: "Failed to parse OpenAI response",
    });
  }
}
