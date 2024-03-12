export declare const languages: readonly ["en", "pl"];
export declare const labelsDefault: Record<(typeof languages)[number], string>;
export type Language = (typeof languages)[number];
export type Translations = {
    [key in Language]: string;
};
