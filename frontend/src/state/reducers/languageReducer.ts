import LanguagesList from '../../localization/languages';
import { LanguageItem } from '../../types/ontologyTypes';
import { LanguageState, LanguageStateAction, SET_LANGUAGE_PRIORITIES } from '../../types/redux/languageTypes';

export const defaultState: LanguageState = {
    // Default language is first language
    languagePriorities: [LanguagesList[0]],
};

const languageReducer = (state: LanguageState = defaultState, action: LanguageStateAction) : LanguageState => {
    switch (action.type) {
        case SET_LANGUAGE_PRIORITIES:
            return {
                ... state,
                languagePriorities: action.payload.languagePriorities,
            };
        default:
            return state;
    }
};

export const setLanguagePriorities = (languagePriorities: LanguageItem[]): LanguageStateAction => ({
    type: 'SET_LANGUAGE_PRIORITIES',
    payload: { languagePriorities },
});

export default languageReducer;