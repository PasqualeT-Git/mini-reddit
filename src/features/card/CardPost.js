import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import millify from 'millify';
import axios from 'axios';

import './cardPost.css';
import { getSwitchState } from '../../redux/switch/switchSlice'

const CardPost = ({ups, title, author, content, comments, date, id}) => {
  let newDate = new Date(date * 1000);
  const switchStatus = useSelector(getSwitchState);

  useEffect(() => {
    const postContent = document.querySelector(`#post_${id}`);

    if(postContent != null) {
      const height = postContent.clientHeight
      let totalHeight = Math.floor(height * 100 / 30);
      if (totalHeight > 200) {
        totalHeight -= totalHeight/2.7;
      }
      if (totalHeight < 70) {
        totalHeight += 50
      }

      postContent.parentElement.style.height = `${totalHeight}px`;
    }
  },[id])

  useEffect(() => {
    const fetchUserThumbnail = async () => {
      const response = await axios.get(`/user/${author}/about.json`);
      const userDataIcon = response.data.data.icon_img
      const userIcon = userDataIcon?.split('?')[0];
  
      const image = document.querySelector(`#icon_${id}`);
      
      if(image) {
        image.src = userIcon;
      }
    }

    fetchUserThumbnail();
  },[author, id])

  return (
    <div className={switchStatus ? "card_container--dark" : "card_container" }>
      <div className="votes">
        <img src={process.env.PUBLIC_URL + 'media/chevron.svg'} alt=""/>
        <span className="font-small">{millify(ups, {lowercase: true, decimalSeparator: ","})}</span>
        <img src={process.env.PUBLIC_URL + 'media/chevron_down.svg'} alt=""/>
      </div>
      <div className="author">
        <p className="font-small">{author}</p>
        <img src="" alt="" id={`icon_${id}`} />
      </div>
      <div className="post_content" id={`post_${id}`}>
        <h4>{title}</h4>
        <p>{content && content}</p>
      </div>
      <div className="comments">
        <img src={process.env.PUBLIC_URL + 'media/comments_icon.svg'} alt=""/>
        <span className="font-small">{millify(comments, {lowercase: true, decimalSeparator: ","})}</span>
      </div>
      <div className="date font-small">
        <ReactTimeAgo date={newDate} locale="en-UK" />
      </div>
    </div>
  )
}

export default CardPost