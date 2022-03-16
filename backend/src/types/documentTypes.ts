export type Document = {
    id: string;
    title: string;
    language: LanguageReference;
    format: string;
    url: string;
}

export type Language = {
    isoCode: string;
    // What goes here?
}

export type LanguageReference = string;