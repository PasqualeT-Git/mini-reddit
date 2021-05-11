import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import './cards.css';
import CardPost from '../card/CardPost';
import { loadPosts, selectPosts, isLoadingPosts } from '../../redux/getRedditData/postsSlice';

const Cards = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const isLoading = useSelector(isLoadingPosts);

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
          posts.map(post => {
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
          })
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