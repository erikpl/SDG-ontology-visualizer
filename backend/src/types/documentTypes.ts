
export type Document = {
    celexID: string;
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

export type DocumentSDGRelation = {
    celexID: string;
    goals: string[];
    targets: Map<string, string[]>;
}

export type LanguageReference = string;