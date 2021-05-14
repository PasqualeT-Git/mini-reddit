import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';

import './cards.css';
import CardPost from '../card/CardPost';
import getRedditDataRequest from '../../helpers/API_requests/getRedditDataRequest';
import { selectPosts, isLoadingPosts, addNextPosts } from '../../redux/getRedditData/postsSlice';
import { selectStoredSubreddit, selectFilter } from '../../redux/filters/subredditsFiltersSlice';
import { getSwitchState } from '../../redux/switch/switchSlice';

const Cards = () => {
  const [ref, inView] = useInView({
    threshold: 0.8
  })

  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const postsKeysArray = posts.map(post => post.data.name);
  const lastPostName = posts[posts.length - 1]?.data.name;
  const isLoading = useSelector(isLoadingPosts);
  const switchStatus = useSelector(getSwitchState);
  const filter = useSelector(selectFilter);

  let subreddit = useSelector(selectStoredSubreddit);

  if(subreddit.title === ""){
    subreddit = {title: "YourTopPosts", icon: process.env.PUBLIC_URL + "/media/reddit_robot.png"};
  }
  
  useEffect(() => {
    async function loadNextPosts() {

      if(inView){
        const loadingDiv = document.getElementById('load_posts');

        loadingDiv.classList.add('load_posts');
        
        const url = subreddit.title === "YourTopPosts" ? "https://oauth.reddit.com" : `https://oauth.reddit.com/r/${subreddit.title}`;
        let nextPosts = await getRedditDataRequest(url , filter, `limit=10&after=${lastPostName}`);

        const cleanedPostsArray = nextPosts.data.children.filter(post => {
          return !postsKeysArray.includes(post.data.name)
        })
        
        setTimeout(() =>{
          loadingDiv.classList.remove('load_posts');
          dispatch(addNextPosts(cleanedPostsArray));

          if (cleanedPostsArray.length <= 0){
            loadingDiv.classList.add('no_more_posts');

            setTimeout(() => {
            loadingDiv.classList.remove('no_more_posts');
            }, 1000)
          }
        }, 1000)
      }
    }
    loadNextPosts()
  },[dispatch, inView, filter, lastPostName, subreddit.title, postsKeysArray])

  return (
    <div className="cards_container" inview={inView.toString()}>
      {isLoading ? (
        <>
          <div className="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          <p id="loading">Loading posts...</p>
        </>
      ) : (
        <>
          <div className={switchStatus ? "active_subreddit--dark" : "active_subreddit"}>
            <img src={subreddit.icon} alt="" />
            <p>r/{subreddit.title}</p>
          </div>
          {posts.map(post => {
            return (
              <CardPost
                ups={post.data.ups}
                title={post.data.title}
                author={post.data.author}
                content={post.data.selftext && post.data.selftext}
                comments={post.data.num_comments}
                date={post.data.created_utc}
                id={post.data.id}
                link={post.data.url_overridden_by_dest}
                preview={post.data.preview}
                key={`post_${post.data.id}`}
              />
            )
          })}
          <div ref={ref} id="load_posts"></div>
        </>
        )
      }
        {posts.length === 0 && !isLoading ? (
            <div className="no_posts_loaded">
              <img src={process.env.PUBLIC_URL + '/media/no_posts_image.png'} id="no_posts_image" alt=""/>
              <p>No posts available....</p><br/><p>sorry!</p>
            </div>
          ) : undefined 
        }
    </div>
  )
}

export default Cards