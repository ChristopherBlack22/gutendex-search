export type LanguageOption = {
  value: string;
  label: string;
};

export type SearchFormValues = {
  search: string;
  topic: string;
  languages: LanguageOption[];
  copyright: string;
  // copyright: 'true' | 'false' | '';
  author_year_start: string;
  author_year_end: string;
};

export type SearchParamsObj = Partial<Omit<SearchFormValues, 'languages'> & { languages: string }>;
