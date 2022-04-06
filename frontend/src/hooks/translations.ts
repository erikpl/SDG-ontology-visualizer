import LocalizedStrings from 'react-localization';
import index from '../localization';
import { useLanguageContext } from '../contexts/LanguageContext';

export default function useTranslation() {
  const { language } = useLanguageContext();
  const translation = new LocalizedStrings(index);

  translation.setLanguage(language);
  return translation;
}