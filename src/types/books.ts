export type Person = {
  birth_year: number | null;
  death_year: number | null;
  name: string;
};

export type Book = {
  id: number;
  title: string;
  subjects: string[];
  authors: Person[];
  summaries: string[];
  translators: Person[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Record<string, string>;
  download_count: number;
};

export type GetBooksResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Book[];
};
