import React, { useState, useEffect } from 'react';
import { Author, SearchResults } from './exports';
import { getSearchResults, clearSearch } from '../store/clickStore';
import { connect } from 'react-redux';
const App = ({ getResults, searchResults, clearSearchResults }) => {
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  const [emptySearch, setEmptySearch] = useState(false);

  useEffect(() => {
    if (Object.keys(searchResults).length) {
      setLoader(false);
    }
  }, [Object.keys(searchResults).length]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="main">
      <div className="form">
        <div className="form-base">
          <input
            className="input"
            name="input"
            type="text"
            value={search}
            placeholder="search"
            onChange={onChange}
          />
        </div>
        <div className="media-select">
          <div
            onClick={() => {
              getResults(search);
              setLoader(true);
              setSearch('');
              if (Object.keys(searchResults).length) {
                clearSearchResults();
              }
            }}
            className="media-select-mp4"
          >
            <p>mp4</p>
          </div>

          <div
            onClick={() => {
              getResults(search);
              setLoader(true);
              setSearch('');
              if (Object.keys(searchResults).length) {
                clearSearchResults();
              }
            }}
            className="media-select-mp3s"
          >
            <p>mp3</p>
          </div>
        </div>
      </div>

      {loader ? (
        <div className="loader">
          <img src="images/loader.gif" />
        </div>
      ) : (
        ''
      )}

      {Object.keys(searchResults).length ? (
        <SearchResults videoResults={searchResults.info.items} />
      ) : !loader ? (
        <Author />
      ) : (
        ''
      )}

      <div className="error">
        <p>Empty Search!</p>
      </div>
    </div>
  );
};

const dispatchState = (store) => {
  return { searchResults: store.click.media };
};
const dispatchProps = (dispatch) => {
  return {
    getResults: (search) => dispatch(getSearchResults(search)),
    clearSearchResults: () => dispatch(clearSearch()),
  };
};
export default connect(dispatchState, dispatchProps)(App);
