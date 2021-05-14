import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import ReactTimeAgo from 'react-time-ago';
import millify from 'millify';
import axios from 'axios';

import './cardPost.css';
import { getSwitchState } from '../../redux/switch/switchSlice'

const CardPost = ({ups, title, author, content, comments, date, id, link, preview}) => {
  let newDate = new Date(date * 1000);

  const switchStatus = useSelector(getSwitchState);
  const image = preview?.images[0].source;

  const handleImageClick = (e) => {
    const imgSrc = e.target.src;
    const modal = document.querySelector(".image_container .modal_container");
    const modalImg = document.querySelector("#modal_img");

    modal.style.display = "block";
    modalImg.src = imgSrc
    document.body.style.overflow = "hidden";
    
    modal.onclick = function(event) {
      if (event.target === modal) {
        document.body.style.overflow = "auto";
        modal.style.display = "none";
      }
    }
  }

  useEffect(() => {
    const postContent = document.querySelector(`#post_${id}`);

    if(postContent != null) {
      const height = postContent.clientHeight
      let totalHeight = Math.floor(height * 100 / 30);

      if (totalHeight > 200) {
        totalHeight -= totalHeight/2.7;
      }
      if (totalHeight < 70) {
        totalHeight += 50;
      }
      if(preview?.enabled) {
        totalHeight -= totalHeight/3.2;

        postContent.style.top = "15%"
      }

      postContent.parentElement.style.height = `${totalHeight}px`;
    }
  },[id, image?.height, preview?.enabled])

  useEffect(() => {
    (async function fetchUserThumbnail() {
      let userIcon = process.env.PUBLIC_URL + 'media/reddit_icon.png';
      
      if(author !== "[deleted]") {
        const response = await axios.get(`/user/${author}/about.json`);
        const userDataIcon = response.data.data.icon_img
        userIcon = userDataIcon?.split('?')[0];
      }
    
        const image = document.querySelector(`#icon_${id}`);
        
        if(image) {
          image.src = userIcon;
        }
    })()

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
        {link && <a href={link} target="_blank" rel="noreferrer">{link.slice(0, 24)}...  <i className="fa fa-external-link" style={{fontSize: 12}}></i></a>}
        {preview?.enabled && <div className="image_container">
          <img src={image.url.replace('amp;', '')} alt=""  onClick={handleImageClick}/>
          <div className='modal_container' id='modal_mobile'>
            <div className="modal-content">
              <img src="" alt="" id="modal_img"/>
            </div>
          </div>
        </div>} 
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
