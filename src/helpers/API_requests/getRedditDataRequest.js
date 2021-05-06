import getAccessToken from '../oauth2/oauth2';
import axios from 'axios';


const getRedditDataRequest = async (endpoint, params = null) => {
  if (!localStorage.getItem('auth_token')) {
    const authorization_code = await getAccessToken();
    localStorage.setItem('auth_token', authorization_code.access_token.toString())
  }
  
  const redditOauthApi = axios.create({
    baseURL: 'https://oauth.reddit.com',
    headers: {'Authorization': `bearer ${localStorage.getItem("auth_token")}`}
  })

  if (params) {
    endpoint += `?${params}`
  }

  try {
    const request = await redditOauthApi.get(endpoint);
    
    if (request.status === 200) {
      return request.data;
    }
    
  } catch (err) {
    console.log(err)
  }
}

export default getRedditDataRequest