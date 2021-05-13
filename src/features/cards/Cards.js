import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './cards.css';
import CardPost from '../card/CardPost';
import { loadPosts, selectPosts, isLoadingPosts } from '../../redux/getRedditData/postsSlice';
import { selectStoredSubreddit } from '../../redux/filters/subredditsFiltersSlice';
import { getSwitchState } from '../../redux/switch/switchSlice';

const Cards = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(isLoadingPosts);
  const switchStatus = useSelector(getSwitchState)
  let subreddit = useSelector(selectStoredSubreddit);

  if(subreddit.title === ""){
    subreddit = {title: "YourTopPosts", icon: process.env.PUBLIC_URL + "/media/reddit_robot.png"}
  }

  useEffect(() => {
    const values = {name: "", filter: "hot"}
    dispatch(loadPosts(values));
  },[dispatch])
  
  
  return (
    <div className="cards_container">
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
                key={`post_${post.data.id}`}
              />
            )
          })} 
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