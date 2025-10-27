import ISO6391 from 'iso-639-1';
import { type SearchFormValues, type SearchParamsObj, type LanguageOption } from '@/types/search';

const SEARCH_FORM_KEYS: (keyof SearchFormValues)[] = [
  'search',
  'topic',
  'languages',
  'copyright',
  'author_year_start',
  'author_year_end',
];

export function cleanSearchParamsObj(values: SearchParamsObj) {
  const cleanedValues: SearchParamsObj = {};
  for (const key of SEARCH_FORM_KEYS) {
    const value = values[key];
    if (!value) continue;
    if (key === 'languages' && value.length) {
      const validCodes = value
        .split(',')
        .reduce<string[]>((acc, code) => {
          const lowerCaseCode = code.toLowerCase();
          if (ISO6391.validate(lowerCaseCode)) {
            acc.push(lowerCaseCode);
          }
          return acc;
        }, [])
        .sort();
      cleanedValues[key] = validCodes.join(',');
    } else {
      cleanedValues[key] = (value as string).toLowerCase().trim();
    }
  }
  return cleanedValues;
}

export function createLanguageOptions(): LanguageOption[] {
  const names = ISO6391.getAllNames();
  return names.map((name) => {
    return {
      value: ISO6391.getCode(name),
      label: name,
    };
  });
}
