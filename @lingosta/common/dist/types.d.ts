export declare enum TestEnum {
    A = "a",
    B = "b"
}
export declare enum Language {
    SPANISH = "es",
    BRAZILIAN_PORTUGUESE = "pt-BR",
    ENGLISH = "en",
    KOREAN = "ko"
}
export interface Term {
    source: string;
    target: string;
    weight: number;
}
export interface Translation {
    type: Language;
    sentence: string;
    terms: Term[];
}
