
# Book Search

This is a project that uses OpenLibrary.org 's open source library to create a very general "book search" application. The user types in a title, author name, quote from the book, etc and the results appear down below.

## Usage/Examples

```javascript
interface Book {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
}
<BookSearch
    onResultSelect={(book) => showDetails(book)}
    resultsPerPage={10}
/>

```


## API Reference

#### Open Library

```http
  fetch('https://openlibrary.org//search.json')
```


