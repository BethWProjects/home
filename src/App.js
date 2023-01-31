import './index.css';
import { useState } from 'react';

function App() {

  //set the useState array
  const [userQuery, setUserQuery] = useState('')

  //create a Search function to redirect a user to a new url upon search
  //use the window.open() to redirect to a url specified
  //interpolate the google url with a query assigned to the userQuery state value
  //assign the userQuery value to the 'q' parameter 
  //assing a second argument '_blank' telling the browser to open a new tab
  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, '_blank')
  }

  //create a function to update the query and set state (this function will go within the onChange attribute, so event target is provided, use this event as an argument in function)
  //event.target.value is the value the user enters into the field
  const updateUserQuery = event => {

    setUserQuery(event.target.value)
  }

  return (
    <div className="App">
      <h1>Hello Beth</h1>
      <div className='form'>
        <input value={userQuery} onChange={updateUserQuery}/>
        <button onClick={searchQuery}>Search</button>
      </div>
    </div>
  );
}

export default App;
