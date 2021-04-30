import getAccessToken from '../oauth2/oauth2';

const getRedditDataRequest = async (endpoint, params = null) => {
  const authorization_code = await getAccessToken()
  const url = new URL('https://oauth.reddit.com'+ endpoint);

  const headers = { 
    'Authorization': `bearer ${authorization_code}`,
  };

  let options = {
    method: 'GET',
    headers: headers,
  }

  if (params) {
    url.search = new URLSearchParams(params).toString()
  }
  
  try {
    const response = await fetch(url, options);
    
    if (response.ok) {
      return response.json();
    }
    
  } catch (err) {
    throw new Error(err)
  }
}

export default getRedditDataRequest