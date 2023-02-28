import './index.css';
import { useState } from 'react';
import Joke from './Joke';
import Stories from './Stories';
import JokeWithCustomHook from './JokeWithCustomHook';
import StoriesWithCustomHook from './StoriesWithCustomHook';
import Tasks from './Tasks';
import Gallery from './Gallery';
import Matrix from './Matrix';
import MatrixDynamicInput from './MatrixDynamicInput';

function App() {

  //set the useState array
  const [userQuery, setUserQuery] = useState('')
  const [showGallery, setShowGallery] = useState(true);  //a new piece of state set as a boolean to show gallery or not

  //create a function to update the query and set state (this function will go within the onChange attribute, so event target is provided, use this event as an argument in function)
  //event.target.value is the value the user enters into the field
  //capture the value in the input tag in the return statement,
  //activate that value within the onChange attribute in the return statement
  const updateUserQuery = event => {
    // console.log('userQuery', userQuery)
    setUserQuery(event.target.value)
  }

   //create a Search function to redirect a user to a new url upon search
  //use the window.open() to redirect to a url specified
  //interpolate the google url with a query assigned to the userQuery state value
  //assign the userQuery value to the 'q' parameter 
  //assing a second argument '_blank' telling the browser to open a new tab
  //call that value in the onClick attribute in the return statement
  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, '_blank')
  }

  //create a helper method that can flip the gallery boolean 
  const toggleShowGallery = () => {
    setShowGallery(!showGallery)  //set showGallery to the opposite of what the current boolean is (true/false), this allows us to add a button to hide/show the gallery
  }

  //create a function to register a click upon clicking the return/enter key...NOTE: "Enter" is the value it must strictly equal
  //assign an attribute in the input tag to call the function
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchQuery()
    }
  }

  return (
    <div className="App">
      <h1>Hello, Test User - Search Google here</h1>
      <div className='form'>
        <input 
          value={userQuery} 
          onChange={updateUserQuery}
          onKeyPress={handleKeyPress} />
        <button onClick={searchQuery}>Search</button>
      </div>
      <hr />
      <Joke />
      <hr />
      <JokeWithCustomHook />
      <hr />
      <Tasks />
      <hr />
      <div>
        {
          showGallery ? <Gallery /> : null
        }
        <button onClick={toggleShowGallery}>
          {showGallery ? 'Hide' : 'Show'} Gallery
        </button>
      </div>
      <hr />
      <Matrix />
      <hr />
      <MatrixDynamicInput />
      <hr />
      <Stories />
      <hr />
      <StoriesWithCustomHook />
    </div>
  );
}

export default App;
