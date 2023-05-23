import {Configuration, OpenAIApi} from "openai";
import type {VercelRequest, VercelResponse} from "@vercel/node";
import {
  getLanguageName,
  Language,
  mapRawTranslation,
  RawTranslationResponse,
  TranslationRequest,
  TranslationResponse,
} from "@lingosta/common";


const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const openai = new OpenAIApi(configuration);

// cleanResponse cleans up the upstream response so that it can be properly serialized
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

  const prompt: string = process.env.OPENAI_PROMPT
    .replace("$SOURCE_LANGUAGE_NAME", getLanguageName(type))
    .replace("$SOURCE_LANGUAGE", type)
    .replace("$TARGET_LANGUAGE", Language.ENGLISH)
    .replace("$SENTENCE", sentence);

  const query = await openai.createCompletion({
    model: process.env.OPENAI_MODEL,
    max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS),
    prompt: prompt,
  });

  const result: string = cleanResponse(query.data.choices[0].text);

  try {
    const rawTranslation: RawTranslationResponse = JSON.parse(result);
    const translation: TranslationResponse = mapRawTranslation(sentence, rawTranslation, type as Language);

    console.log(translation);
    return response.status(200).json(translation);
  } catch (e) {
    console.error(e);
    return response.status(500).json({
      error: "Failed to parse response",
    });
  }
}
