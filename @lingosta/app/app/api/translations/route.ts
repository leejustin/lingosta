import { NextResponse } from "next/server";
import {Configuration, OpenAIApi} from "openai";
import {
  getLanguageName,
  Language,
  mapRawTranslation,
  RawTranslationResponse,
  TranslationRequest,
  TranslationResponse,
} from "../../../models";


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

export async function GET() {
  return NextResponse.json({"hi": "there"});
}

export async function POST(request: Request) {
  const requestBody: TranslationRequest = await request.json();

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

    return NextResponse.json(translation);
  } catch (e) {
    console.error(e);
    return new Response("Failed to parse response", {
      status: 500
    })
  }
}