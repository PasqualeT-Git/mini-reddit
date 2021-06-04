import getAccessToken from '../oauth2/oauth2';
import axios from 'axios';


const getRedditDataRequest = async (endpoint = '', filter = 'hot', params = null) => {
  if (!sessionStorage.getItem('auth_token')) {
    const responseObj = await getAccessToken();

    sessionStorage.setItem('auth_token', responseObj.access_token.toString())
    sessionStorage.setItem('ref_token', responseObj.refresh_token.toString())
  }
  
  let redditOauthApi = axios.create({
    baseURL: 'https://oauth.reddit.com',
    headers: {'Authorization': `bearer ${sessionStorage.getItem("auth_token")}`}
  })

  if (sessionStorage.getItem("refreshed_access_token")) {
    redditOauthApi.defaults.headers.Authorization = `bearer ${sessionStorage.getItem("refreshed_access_token")}`;
  }

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
    if (err.response.status === 401 && !sessionStorage.getItem('refreshed_access_token')) {
      const refreshToken = sessionStorage.getItem('ref_token');
      const responseObj = await getAccessToken(refreshToken);
      
      sessionStorage.setItem('refreshed_access_token', responseObj.access_token.toString());
      return window.location = "/application";
    }
    sessionStorage.clear()
    return window.location = "/application"
  }
}

export default getRedditDataRequest