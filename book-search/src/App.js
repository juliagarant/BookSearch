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
      // const element = array[i];

      resultsOutput.innerHTML += `<div id=\"book\"> Test ${i} </div>`
      console.log(data)

    }
  }

  function searchBook(){
    // fetch('https://openlibrary.org//search.json?q='+ searchInput.value)
    fetch('https://cors-anywhere.herokuapp.com/https://openlibrary.org//search.json?q='+ searchInput.value)
    .then(response => response.json())
    // .then(data => console.log(data));
    .then(data => displayBooks(data));
  }

  function handleClick(){
    console.log("here")
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

      </div>
      <br/>
      <div id="results">
        
      </div>
    </div>
  );
}

export default App;
