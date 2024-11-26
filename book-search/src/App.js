import './styles.css'


function App() {
  function searchBook(){
    fetch('https://openlibrary.org/api/books?bibkeys=ISBN%3A0201558025&format=json&jscmd=viewapi')
    .then(response => response.json())
    .then(data => console.log(data));
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
