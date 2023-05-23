<<<<<<< HEAD
import { Configuration, OpenAIApi } from "openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";
=======
import {Configuration, OpenAIApi} from "openai";
import type {VercelRequest, VercelResponse} from "@vercel/node";
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79
import {
  getLanguageName,
  Language,
  mapRawTranslation,
<<<<<<< HEAD
  RawTranslation,
  Translation,
  TranslationRequest
=======
  RawTranslationResponse,
  TranslationRequest,
  TranslationResponse,
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79
} from "@lingosta/common";


const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_SECRET_KEY,
});

const openai = new OpenAIApi(configuration);

<<<<<<< HEAD
// cleanResponse cleans up the OpenAI response so that it can be properly serialized
=======
// cleanResponse cleans up the upstream response so that it can be properly serialized
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79
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
<<<<<<< HEAD
    const rawTranslation: RawTranslation = JSON.parse(result);
    const translation: Translation = mapRawTranslation(sentence, rawTranslation, Language.SPANISH);
=======
    const rawTranslation: RawTranslationResponse = JSON.parse(result);
    const translation: TranslationResponse = mapRawTranslation(sentence, rawTranslation, type as Language);
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79

    console.log(translation);
    return response.status(200).json(translation);
  } catch (e) {
    console.error(e);
    return response.status(500).json({
<<<<<<< HEAD
      error: "Failed to parse OpenAI response",
=======
      error: "Failed to parse response",
>>>>>>> 4215f1f2c59075f2682ab6e4751b091a38487d79
    });
  }
}
