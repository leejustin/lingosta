export enum TestEnum {
  A = 'a',
  B = 'b',
}

export enum Language {
  SPANISH = "es",
  BRAZILIAN_PORTUGUESE = "pt-BR",
  ENGLISH = "en",
  KOREAN = "ko",
}

export interface Term {
source: string;
target: string;
weight: number; // range 0.0 - 1.0
}
export interface Translation {
  type: Language;
  sentence: string;
  terms: Term[];
}
