import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setSearchTerm, clearSearchTerm } from '../../redux/searchBar/searchBarSlice';
import { getSwitchState } from '../../redux/switch/switchSlice';
import { loadPosts } from '../../redux/getRedditData/postsSlice';
import { loadAutocompleteList, selectAutocompleteList, clearList } from '../../redux/getRedditData/autocompleteSubredditsListSlice';
import { storeSubreddit, selectFilter } from '../../redux/filters/subredditsFiltersSlice';
import './searchBar.css';

const SearchBar = () => {
  const [ term, setTerm ] = useState("");
  const dispatch = useDispatch();
  const switchStatus = useSelector(getSwitchState);
  const filter = useSelector(selectFilter);
  let autocompleteSubredditsList = useSelector(selectAutocompleteList);

  const onTypingHandler = (e) => {
    setTerm(e.target.value)
    dispatch(loadAutocompleteList(e.target.value))
  }

  const onSearchHandler = (e) => {
    const values = { name: term, filter: filter }
    e.preventDefault();

    dispatch(setSearchTerm(term));
    dispatch(loadPosts(values));
    dispatch(storeSubreddit({title: term, icon: "", bckgImage: ""}))
    
    setTimeout(() => {
      dispatch(clearList())
      setTerm('')
    },500)
  }
  
  const onClearHandler = () => {
    setTimeout(() => {
      dispatch(clearSearchTerm());
      setTerm("");
    },500)
  }

  const onClickHandler = (e) => {
    let target = e.target;
    
    if(target.nodeName === 'P' || target.nodeName === 'IMG'){
      target = e.target.parentElement
    }
    
    const subreddit = target.parentElement.dataset.subreddit;
    const icon = target.parentElement.dataset.icon;
    const backgroundImg = target.parentElement.dataset.bckgimage;
    const values = { name: subreddit, filter: filter};
    const modal = document.querySelector('#modal_mobile');
    
    dispatch(loadPosts(values));
    dispatch(storeSubreddit({title: values.name, icon: icon, bckgImage: backgroundImg}));
    
    setTimeout(() => {
      dispatch(clearList())
      setTerm("")
    },500)

    if (modal) {
      modal.style.display = 'none';
    }
  }

  useEffect(() => {
    const screenWidth = document.documentElement.clientWidth;

    if (screenWidth < 480) {
      const modal = document.getElementById('modal_mobile');
      const buttonFireModal = document.getElementById('button--input-small');
      const span = document.getElementById("modal_close_button");
      
      buttonFireModal.onclick = () => {
        document.body.style.overflow = "hidden";
        modal.style.display = "block";
      };
      span.onclick = () => {modal.style.display = "none"};

      window.onclick = (e) => {
        if (e.target === modal) {
          document.body.style.overflow = "auto";
          modal.style.display = "none"
        }
      };
    }
  },[])

  useEffect(() => {
    
  })

  return (
    <>
      <div className={switchStatus ? "dark-theme" : ""}>
        {document.documentElement.clientWidth > 480 ? (
          <>
            <form onSubmit={onSearchHandler} id="search_form" autoComplete="off" >
              <input 
                id="search_term"
                type="text"
                className="input--primary"
                value={term}
                onChange={onTypingHandler}
              />
              <button 
                onClick={onClearHandler}
                className="button--primary-small"
                id="button--input-small">
                <img src={process.env.PUBLIC_URL + 'media/magnifying_icon.svg'}  alt=""/>
              </button>
            </form>
            <div className={autocompleteSubredditsList?.length > 0 ? 'drop_down_list' : ""}>
              {autocompleteSubredditsList?.map(subreddit => {
                if(subreddit.kind === 't5') {
                  const icon = subreddit.data.icon_img ? subreddit.data.icon_img : subreddit.data.community_icon.split('?')[0] || process.env.PUBLIC_URL + '/media/reddit_icon.png';

                  return (
                    <div key={`hint_${subreddit.data.id}`} onClick={onClickHandler} data-subreddit={subreddit.data.display_name} data-icon={icon} data-bckgimage={subreddit.data.banner_background_image}>
                      <div className="subreddit_hint">
                        <img id="subreddit_icon" src={icon} alt="" />
                        <p>{subreddit.data.display_name_prefixed}</p>
                      </div>
                      {subreddit !== autocompleteSubredditsList[autocompleteSubredditsList.length - 1] ? (
                        <hr style={{width: '30%', margin: '0 auto'}}/>
                      ) : undefined}
                    </div>
                  )
                }
                return undefined
              })}
            </div>
          </>
        ) : (
          <>
            <input 
              id="search_term"
              type="text" 
              defaultValue={term}
            />
            <div className='modal_container' id='modal_mobile'>
              <div className="modal-content">
                <form onSubmit={onSearchHandler} autoComplete="off" >
                  <input 
                    className="input_light--secondary-medium"
                    type="text" 
                    value={term}
                    onChange={onTypingHandler}
                  />
                  <button 
                    id="modal_close_button" 
                    className="button--secondary-medium"
                    onClick={onClearHandler}
                  >
                    <img src={process.env.PUBLIC_URL + 'media/magnifying_icon.svg'} alt=""/>
                  </button>
                </form>
                <div className={autocompleteSubredditsList?.length > 0 ? 'drop_down_list' : ""}>
                  {autocompleteSubredditsList?.map(subreddit => {
                    if(subreddit.kind === 't5') {
                      const icon = subreddit.data.icon_img ? subreddit.data.icon_img : subreddit.data.community_icon.split('?')[0] || process.env.PUBLIC_URL + '/media/reddit_icon.png';

                      return (
                        <div key={`hint_${subreddit.data.id}`} onClick={onClickHandler} data-subreddit={subreddit.data.display_name} data-icon={icon} data-bckgimage={subreddit.data.banner_background_image}>
                          <div className="subreddit_hint">
                            <img id="subreddit_icon" src={icon} alt="" />
                            <p>{subreddit.data.display_name_prefixed}</p>
                          </div>
                          {subreddit !== autocompleteSubredditsList[autocompleteSubredditsList.length - 1] ? (
                            <hr style={{width: '30%', margin: '0 auto'}}/>
                          ) : undefined}
                        </div>
                      )
                    }
                    return undefined
                  })}
                </div>
              </div>
            </div>
        
            <button 
              onClick={onClearHandler}
              className="button--primary-small"
              id="button--input-small">
              <img src={process.env.PUBLIC_URL + 'media/magnifying_icon.svg'}  alt=""/>
            </button>
          </>
        )}
        
      </div>
    </>
  )
}

export default SearchBar