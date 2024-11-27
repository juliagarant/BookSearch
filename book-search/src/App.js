import './styles.css'
/*
Using 
  https://cors-anywhere.herokuapp.com/corsdemo
for CORS error that appears on local testing.
"Cross-Origin Request Blocked", "NetworkError when attempting to fetch resource."
*/ 


function App() {

  function displayBooks(data){
    let resultsOutput = document.getElementById("results")
    
    for (let i = 0; i < 10; i++) {
      console.log(data.docs[i]); 
      // resultsOutput.innerHTML += `<div id=\"book\"> Test ${i} </div>`
      resultsOutput.innerHTML += 
        `<div id="book"> 
          <h2> ${data.docs[i].title} </h2>
          <br/>
          <i>${data.docs[i].author_name},</i>
          First published in: ${data.docs[i].first_publish_year}  
        </div>`


    }
  }

  function searchBook(){
    let searchInput = document.getElementById("search");
    {console.log("searchInput: ")}
    {console.log(searchInput)}

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
        <input id="search" type="text" placeholder='Search by title, author, etc.'/>
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
