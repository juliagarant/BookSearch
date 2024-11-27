import './styles.css'

let firstSearch = true;

function App() {

  function displayBooks(data){
    let resultsOutput = document.getElementById("results")
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
          <h2>${data.docs[i].title}</h2>
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

  function searchBook(){
    /*
    Using 
      https://cors-anywhere.herokuapp.com/corsdemo
    for CORS error that appears on local testing.
    "Cross-Origin Request Blocked", "NetworkError when attempting to fetch resource."
    */ 
    let searchInput = document.getElementById("search");

    // fetch('https://openlibrary.org//search.json?q='+ searchInput.value)
    fetch('https://cors-anywhere.herokuapp.com/https://openlibrary.org//search.json?q='+ searchInput.value)
    .then(response => response.json())
    .then(data => displayBooks(data));
    console.log("search book")
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
        <div id="top">
          <p>Top 10 results:</p>
          <hr/>
        </div>
        <div id="results">

        </div>
      </div>
    </div>
  );
}

export default App;
