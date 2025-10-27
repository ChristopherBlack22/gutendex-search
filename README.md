NL Patent test

- Decision was made to initiate search and data fetching through url search params and useQuery. This allows user to share and return to searches rather than using internal state (window.pushState used over router.replace for this reason). As the url is updated useQuery is automatically triggered to fetch the next batch of data.
- useQuery along with Nextjs allows data from previous searches to be prefetched on the server to try and speed up load times, it also allows prefetching on the client to again speed up navigation between pages.
- React hook form used to manage logic of search form. All search and filter fields ahve ben implemented. No fields have been made a requirement allowing the user full flexibility in their search.
- React Select used to allow selection of multiple languages.
- Custom number fields created as date pickers were not user friendly when dealing with authors ranging over around 3,000 years.
- Tried to mimic colour pallette of NL Patent.

- Test for basic redering and user input have been completed and have tested at a component level. Ideally would test some of the more complex functions individually and would also mock api calls to ensure the correct requests are being made to the api.
- Basic error handling has been been implemented but would like to have improved on this.
