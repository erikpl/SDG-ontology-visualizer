import { LanguageItem } from '../ontologyTypes';

export type LanguageState = {
    languagePriorities: LanguageItem[];
};

export type SetLanguagePrioritiesPayload = {
    languagePriorities: LanguageItem[];
};

export type SetLanguagePrioritiesAction = {
    type: typeof SET_LANGUAGE_PRIORITIES;
    payload: SetLanguagePrioritiesPayload;
};

export type LanguageStateAction =
    SetLanguagePrioritiesAction;

export const SET_LANGUAGE_PRIORITIES = 'SET_LANGUAGE_PRIORITIES';