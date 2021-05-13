import getAccessToken from '../oauth2/oauth2';
import axios from 'axios';


const getRedditDataRequest = async (endpoint = '', filter = 'hot', params = null) => {
  if (!sessionStorage.getItem('auth_token')) {
    const authorization_code = await getAccessToken();
    sessionStorage.setItem('auth_token', authorization_code.access_token.toString())
  }
  
  const redditOauthApi = axios.create({
    baseURL: 'https://oauth.reddit.com',
    headers: {'Authorization': `bearer ${sessionStorage.getItem("auth_token")}`}
  })

  if(filter !== "") {
    endpoint += `/${filter}.json`;
  }
  
  if (endpoint.match(/\/r\/\/[a-z]+.json/)){
    endpoint = "/.json"
  }
  
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