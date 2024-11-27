import './styles.css'

let firstSearch = true;
let errBlock = document.getElementById("errorBlock");


function App() {

  function displayBooks(data){
    let topWords = document.getElementById("top")
    let resultsOutput = document.getElementById("results")
    try{
      
      topWords.innerHTML = `<h2>Top 10 results:</h2> <hr/>`
      if (firstSearch){
        for (let i = 0; i < 10; i++) {
          console.log(data.docs[i].cover_i, data.docs[i].title, data.docs[i].author_name, data.docs[i].first_publish_year); 
    
          let html = `<div id="book">`;

          if (isNaN(data.docs[i].cover_i)) {
            html += `<img id="bookCover" src="/imgs/cover-not-found.png" alt="Cover not found" />`;
          } else {
            html += `<img id="bookCover" src="https://covers.openlibrary.org/b/id/${data.docs[i].cover_i}-M.jpg" />`;
          }

          html += `
            <h3>${data.docs[i].title}</h3>
            <i>${data.docs[i].author_name[0]},</i>
            First published in ${data.docs[i].first_publish_year}
            </div>`;

          resultsOutput.innerHTML += html;
          firstSearch = false;
        }
      } else {
        resultsOutput.innerHTML = " "
        for (let i = 0; i < 10; i++) {
          console.log(data.docs[i].cover_i, data.docs[i].title, data.docs[i].author_name, data.docs[i].first_publish_year); 

          let html = `<div id="book">`;
          
          if (isNaN(data.docs[i].cover_i)) {
            html += `<img id="bookCover" src="/imgs/cover-not-found.png" alt="Cover not found" />`;
          } else {
            html += `<img id="bookCover" src="https://covers.openlibrary.org/b/id/${data.docs[i].cover_i}-M.jpg" />`;
          }

          html += `
            <h2>${data.docs[i].title}</h2>
            <i>${data.docs[i].author_name[0]},</i>
            First published in ${data.docs[i].first_publish_year}
          </div>`;

          resultsOutput.innerHTML += html;
        }
      }
    }
    catch(err){
      errBlock.innerHTML = `Error loading books: ${err}`
    }
  }

  function searchBook(){
    /*
    Using 
      https://cors-anywhere.herokuapp.com/corsdemo
    for CORS error that appears on local testing.
    "Cross-Origin Request Blocked", "NetworkError when attempting to fetch resource."
    */ 
    let searchInput = document.getElementById("search");    
    let load = document.getElementById("loading")

    try{
      // Loading appearance with Hide and display of spinning book
      if (load.style.display === "none" || load.style.display === "") {
        load.style.display = "block";
    
        setTimeout(() => {
          load.style.display = "none";
        }, 8000);
      }

      // fetch('https://openlibrary.org//search.json?q='+ searchInput.value)
      fetch('https://cors-anywhere.herokuapp.com/https://openlibrary.org//search.json?q='+ searchInput.value)
      .then(response => response.json())
      .then(data => displayBooks(data));
      console.log("search book")
    }
    catch(err){
      errBlock.innerHTML = `Error searching for book: ${err}`
    }
  }

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
      <p id="errorBlock"></p>
      
      <div id="background">
        <div id="loading">
          <img src="/imgs/SpinningBook.gif" />
        </div>
        <div id="top"></div>
        <div id="results">

        </div>
      </div>
    </div>
  );
}

export default App;
