import './styles.css'

let searchInput = document.getElementById("search")
let resultsOutput = document.getElementById("results")

/*
Using 
  https://cors-anywhere.herokuapp.com/corsdemo
for CORS error that appears on local testing.
"Cross-Origin Request Blocked", "NetworkError when attempting to fetch resource."
*/ 


function App() {

  function displayBooks(data){
    for (let i = 0; i < 10; i++) {
      console.log(data.docs[i]); 
      // resultsOutput.innerHTML += `<div id=\"book\"> Test ${i} </div>`
      resultsOutput.innerHTML += 
        `<div id=\"book\"> 
          <h2> ${data.docs[i].title} </h2>
          <br/>
          <i>${data.docs[i].author_name},</i>
          Published in: ${data.docs[i].first_publish_year}  
        </div>`


    }
  }

  function searchBook(){
    // fetch('https://openlibrary.org//search.json?q='+ searchInput.value)
    fetch('https://cors-anywhere.herokuapp.com/https://openlibrary.org//search.json?q='+ searchInput.value)
    .then(response => response.json())
    // .then(data => console.log(data));
    .then(data => displayBooks(data));
    console.log("search book")
  }

  return (
    <div className="App">
      <h1>Let's look for a book!</h1>
      <p>With the help of <a href="https://openlibrary.org/developers/api" target="_blank">openlibrary.org</a></p>
      <br/>
      <div>
        <input id="search" placeholder='Search by title, author, etc.'/>
        <button onClick={searchBook} id="btnSearch">Search</button>
        {/* <button onClick={handleClick} id="btnSearch">Search</button> */}
        {console.log("searchInput: ")}
        {console.log(searchInput)}
      </div>
      <br/>
      <div id="results">
        
      </div>
    </div>
  );
}

export default App;
