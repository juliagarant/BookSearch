import React, { useState } from 'react';
import './styles.css';

function App() {
  const [searchInput, setSearchInput] = useState([]);
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [firstSearch, setFirstSearch] = useState(true);

  const displayBooks = (data) => {
    // let topWords = document.getElementById("top")
    // let resultsOutput = document.getElementById("results")
    // try{
      
    //   topWords.innerHTML = `<h2>Top 10 results:</h2> <hr/>`
    //   if (firstSearch){
    //     for (let i = 0; i < 10; i++) {
    //       console.log(data.docs[i].cover_i, data.docs[i].title, data.docs[i].author_name, data.docs[i].first_publish_year); 
    
    //       let html = `<div id="book">`;

    //       if (isNaN(data.docs[i].cover_i)) {
    //         html += `<img id="bookCover" src="/imgs/cover-not-found.png" alt="Cover not found" />`;
    //       } else {
    //         html += `<img id="bookCover" src="https://covers.openlibrary.org/b/id/${data.docs[i].cover_i}-M.jpg" alt="The cover of ${data.docs[i].title}"/>`;
    //       }

    //       html += `
    //         <h3>${data.docs[i].title}</h3>
    //         <p><i>${data.docs[i].author_name[0]}</i></p>
    //         <p>First published in ${data.docs[i].first_publish_year}</p>
    //         <p id="key">Open Library Key: ${data.docs[i].key}</p>
    //         </div>`;

    //       resultsOutput.innerHTML += html;
    //       firstSearch = false;
    //     }
    //   } else {
    //     resultsOutput.innerHTML = " "
    //     for (let i = 0; i < 10; i++) {
    //       console.log(data.docs[i].cover_i, data.docs[i].title, data.docs[i].author_name, data.docs[i].first_publish_year); 

    //       let html = `<div id="book">`;
          
    //       if (isNaN(data.docs[i].cover_i)) {
    //         html += `<img id="bookCover" src="/imgs/cover-not-found.png" alt="Cover not found" />`;
    //       } else {
    //         html += `<img id="bookCover" src="https://covers.openlibrary.org/b/id/${data.docs[i].cover_i}-M.jpg" alt="The cover of ${data.docs[i].title}"/>`;
    //       }

    //       html += `
    //         <h2>${data.docs[i].title}</h2>
    //         <i>${data.docs[i].author_name[0]},</i>
    //         First published in ${data.docs[i].first_publish_year}
    //       </div>`;

    //       resultsOutput.innerHTML += html;
    //     }
    //   }
    // }
    // catch(err){
    //   errBlock.innerHTML = `Error loading books: ${err}`
    // }
    try {
      console.log("Display books")
      for (let i = 0; i < 10; i++) {
        const book = data.docs[i];
        const coverSrc = isNaN(book.cover_i)
          ? "/imgs/cover-not-found.png"
          : `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        console.log(`Cover Src: ${coverSrc}`)
        books.push(
          <div id="book" key={i}>
            <img
              id="bookCover"
              src={coverSrc}
              alt={isNaN(book.cover_i) ? "Cover not found" : `The cover of ${book.title}`}
            />
            <h3>{book.title}</h3>
            <p>
              <i>{book.author_name?.[0]}</i>
            </p>
            <p>First published in {book.first_publish_year}</p>
            <p id="key">Open Library Key: {book.key}</p>
          </div>
        );
      }

      // if (!firstSearch) {
      //   setFirstSearch(false);
      // }

      return books;
    } catch (err) {
      setError(`Error loading books: ${err.message}`);
      return null;
    }
  };

  const searchBook = async () => {
    /*
    Using 
      https://cors-anywhere.herokuapp.com/corsdemo
    for CORS error that appears on local testing.
    "Cross-Origin Request Blocked", "NetworkError when attempting to fetch resource."
    */ 

    // let searchInput = document.getElementById("search");    
    // let load = document.getElementById("loading")

    // try{
    //   // Loading appearance with Hide and display of spinning book
    //   if (load.style.display === "none" || load.style.display === "") {
    //     load.style.display = "block";
    
    //     setTimeout(() => {
    //       load.style.display = "none";
    //     }, 8000);
    //   }

    setLoading(true);
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${searchInput}&page=1&limit=10`);
      // const response = await fetch(`https://cors-anywhere.herokuapp.com/https://openlibrary.org//search.json?q=${searchInput}&page=1&limit=10`);
      console.log("Search book")
      const data = await response.json();
      displayBooks(data);
      // setBooks(data.docs.slice(0, 10));
    } catch (err) {
      setError('Error searching for books');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="App">
      <h1>Let's look for a book!</h1>
      <p>With the help of <a href="https://openlibrary.org/developers/api" target="_blank">openlibrary.org</a></p>
      <br/>
      <div>
        <input id="search" type="text" placeholder='Search by title, author, etc.'/>
        <button onClick={searchBook} id="btnSearch">Search</button>
      </div>
      <br/>      
      <div id="background">
        <div id="loading">
          <img src="/imgs/SpinningBook.gif" />
        </div>
        <div id="results">
          {displayBooks}
        </div>
      </div>
    </div>
  );
}

export default App;
