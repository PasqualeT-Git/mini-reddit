// Import v4 from uuid module to create a universally unique identifier
import { v4 as uuidv4 } from 'uuid';
// Import global credentials from an helper stored in the root .env file
import { CLIENT_ID, SECRET_KEY } from '../globalKeysHelper';


// Create a function to get Reddit authorization_code
const getOauth2RedditAccess = () => {
  // create a unique and random string 
  const state = `request_${uuidv4()}`;
  // provide a redirect path 
  const redirectURI = 'http://localhost:3000/';
  // create a string of scopes 
  const scopes = 'identity,mysubreddits,read,vote,subscribe,save,edit';
  
  // Check if the url includes the string 'state=request_'
  if (!window.location.search.includes(`state=request_`)) {
    // Store the state variable in the local storage.
    sessionStorage.setItem('state', state.toString())
    // Redirect the user at the given path with the variables, assigned above, as params.
    const redirectPath = `https://www.reddit.com/api/v1/authorize?client_id=${CLIENT_ID}&response_type=code&state=${state}&redirect_uri=${redirectURI}&duration=permanent&scope=${scopes}&raw_json=1`;
    return window.location.assign(redirectPath)
  }

  if (window.location.search.match(`state=request_`)) {
    // Get params from the query string 
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    // Store params in variables
    const error = urlParams.get('error');
    const code = urlParams.get('code');
    const stateFromParams = urlParams.get('state');

    // Get state previously stored in local storage
    const stateFromSessionStorage = sessionStorage.getItem('state')
    
    // Check if the state from the params matches with the one from local storage
    if (stateFromSessionStorage === stateFromParams) {
      // Remove the state from local storage
      sessionStorage.clear();
      // Return the authorization_code
      return code
    }

    // Check if from query string is some error
    if(error) {
      // Throw the error if it exists
      throw new Error(error)
    }

    // Throw an error if state from params and state from local storage don't match
    console.log('no match');
    throw new Error("The state returned from params doesn't match the one in local")
  }
}

// Create a function to get an access_token using the code returned from the getOauth2RedditAccess function
const getAccessToken = async () => {
  // Retrieve the authorization_code from the getOauth2RedditAccess function
  if (!sessionStorage.getItem('oauth2_')) {
    const code = getOauth2RedditAccess();
    sessionStorage.setItem('oauth2_', code.toString());
  }
  // Provide a redirect path
  const redirectURI = 'http://localhost:3000/';
  
  // Create an encoded (base64) string from the CLIENT_ID and SECRET_ID credentials
  const plainCredentials = CLIENT_ID + ':' + SECRET_KEY;
  const encodedCredentials = Buffer.from(plainCredentials).toString('base64')
  
  // Store in a variable the string params with an interpolation of the right variables from above
  let params = `grant_type=authorization_code&code=${sessionStorage.getItem('oauth2_')}&redirect_uri=${redirectURI}`;
  
  // Create settings for a POST request
  const settings = {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${encodedCredentials}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
  }
  
  // Create promises for the POST request
  try {
    // Make a POST request to the provided url with the options assigned to the settings variable
    const response = await fetch('https://www.reddit.com/api/v1/access_token', settings)
    // Change the fulfilled promises in a JSON file
    const data = await response.json();
    // Return the data object
    return data
    
    // Catch an error
  } catch (error) {
    // Throw the error if it exists
    throw new Error(error)
  }
}

export default getAccessToken