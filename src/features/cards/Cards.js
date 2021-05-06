import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './cards.css';
import CardPost from '../card/CardPost';
import { loadPosts, isLoadingPosts, selectPosts } from '../../redux/getRedditData/postsSlice';

const Cards = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  
  useEffect(() => {
    dispatch(loadPosts("redditdev"));
  },[dispatch])
  
  
  return (
    <div className="cards_container">
      {posts.map(post => {
        return <CardPost
          ups={post.data.ups}
          title={post.data.title}
          author={post.data.author}
          content={post.data.selftext && post.data.selftext}
          comments={post.data.num_comments}
          date={post.data.created_utc}
          id={post.data.id}
          key={post.data.id}
        />
      })}
    </div>
  )
}

export default Cards