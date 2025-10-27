'use client';

import { useSearchParams } from 'next/navigation';
import Select from 'react-select';
import ISO6391 from 'iso-639-1';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { cleanSearchParamsObj, createLanguageOptions } from '@/utils/search';
import { type SearchFormValues, type LanguageOption } from '@/types/search';

const CURRENT_YEAR = new Date().getFullYear();
const LANGUAGE_OPTIONS = createLanguageOptions();

function SearchForm() {
  const searchParams = useSearchParams();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<SearchFormValues>({
    defaultValues: {
      search: searchParams.get('search') ?? '',
      topic: searchParams.get('topic') ?? '',
      languages: searchParams.get('languages')
        ? searchParams
            .get('languages')
            ?.split(',')
            .reduce<LanguageOption[]>((acc, code) => {
              const lowerCaseCode = code.toLowerCase();
              if (ISO6391.validate(lowerCaseCode)) {
                acc.push({ value: lowerCaseCode, label: ISO6391.getName(lowerCaseCode) });
              }
              return acc;
            }, [])
        : [],
      copyright: searchParams.get('copyright') ?? '',
      author_year_start: searchParams.get('author_year_start') ?? '',
      author_year_end: searchParams.get('author_year_end') ?? '',
    },
  });

  const onSubmit: SubmitHandler<SearchFormValues> = (values: SearchFormValues) => {
    const searchParamsObj = {
      ...values,
      languages: values.languages.map((lang) => lang.value).join(','),
    };
    const cleanedValues = cleanSearchParamsObj(searchParamsObj);
    const params = new URLSearchParams(cleanedValues);
    window.history.pushState({}, '', `?page=1&${params.toString()}`);
    reset(values);
  };

  const handleYearChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: { onChange: (value: string) => void }
  ) => {
    let newValue = e.target.value;
    const valueAsNum = Number(newValue);
    if (isNaN(valueAsNum) && newValue !== '-' && newValue !== '') {
      newValue = '';
    } else if (valueAsNum > CURRENT_YEAR) {
      newValue = String(CURRENT_YEAR);
    }
    field.onChange(newValue);
  };

  const handleYearKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: { value: string; onChange: (value: string) => void }
  ) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const input = e.target as HTMLInputElement;
      const valueAsNum = Number(field.value);
      if (isNaN(valueAsNum)) {
        field.onChange('0');
      } else if (e.key === 'ArrowUp' && valueAsNum < CURRENT_YEAR) {
        field.onChange(String(valueAsNum + 1));
        setTimeout(() => {
          input.selectionStart = input.value.length;
          input.selectionEnd = input.value.length;
        }, 0);
      } else {
        field.onChange(String(valueAsNum - 1));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form card centered-content">
      <div className="input-group fill-row">
        <label htmlFor="search" className="label">
          Title/Author
        </label>
        <input
          id="search"
          placeholder="Search by title, author..."
          autoFocus
          {...register('search')}
        />
      </div>
      <div className="input-group">
        <label htmlFor="topic" className="label">
          Topics
        </label>
        <input id="topic" placeholder="Search by subject, genre..." {...register('topic')} />
      </div>
      <div className="input-group">
        <p className="label">Authors alive</p>
        <div className="flex-row no-wrap align-cntr">
          <Controller
            name="author_year_start"
            control={control}
            render={({ field }) => (
              <>
                <label htmlFor="author-year-start" className="label label-inline">
                  From
                </label>
                <input
                  className="custom-number"
                  id="author-year-start"
                  placeholder="Start year..."
                  value={field.value}
                  onChange={(e) => handleYearChange(e, field)}
                  onKeyDown={(e) => handleYearKeyDown(e, field)}
                />
              </>
            )}
          />
          <Controller
            name="author_year_end"
            control={control}
            render={({ field }) => (
              <>
                <label htmlFor="author-year-end" className="label label-inline">
                  To
                </label>
                <input
                  className="custom-number"
                  id="author-year-end"
                  placeholder="End year..."
                  value={field.value}
                  onChange={(e) => handleYearChange(e, field)}
                  onKeyDown={(e) => handleYearKeyDown(e, field)}
                />
              </>
            )}
          />
        </div>
      </div>
      <Controller
        name="languages"
        control={control}
        render={({ field }) => (
          <div className="input-group">
            <label id="languages-label" className="label">
              Languages
            </label>
            <Select
              {...field}
              unstyled
              placeholder="Select languages..."
              aria-labelledby="languages-label"
              options={LANGUAGE_OPTIONS}
              isMulti
              onChange={field.onChange}
              value={field.value}
              classNamePrefix={'react-select'}
              instanceId="languages-select"
            />
          </div>
        )}
      />
      <div className="input-group">
        <p className="label">Existing Copyright</p>
        <div className="flex-row no-wrap align-cntr radio-group">
          <label className="label label-inline">
            <input {...register('copyright')} type="radio" value="true" />
            Confirmed
          </label>
          <label className="label label-inline">
            <input {...register('copyright')} type="radio" value="false" />
            Unconfirmed
          </label>
          <label className="label label-inline">
            <input {...register('copyright')} type="radio" value="" />
            All
          </label>
        </div>
      </div>
      <button disabled={!isDirty} className="btn btn-primary fill-row">
        Search
      </button>
    </form>
  );
}

export default SearchForm;
