import React, { useState, useEffect, useRef } from 'react';
import { Author, SearchResults } from './exports';
import { getSearchResults, clearSearch } from '../store/clickStore';
import { connect } from 'react-redux';
const App = ({ getResults, searchResults, clearSearchResults }) => {
  const [search, setSearch] = useState('');
  const [loader, setLoader] = useState(false);
  const [format, setFormat] = useState(null);
  const [emptySearch, setEmptySearch] = useState(false);

  useEffect(() => {
    if (Object.keys(searchResults).length) {
      setLoader(false);
      setSearch('');
    }
  }, [Object.keys(searchResults).length]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const ref = useRef();
  const submitRequest = (converterFormat) => {
    getResults(search);
    setLoader(true);
    if (!search) {
      setEmptySearch(true);
      ref.current.style.border = '1px solid red';
    } else {
      setEmptySearch(false);
      ref.current.style.border = '1px solid #e0e0e0';
    }
    setFormat(converterFormat);
    if (Object.keys(searchResults).length) {
      clearSearchResults();
    }
  };

  return (
    <div className="main">
      <div className="form">
        <div className="form-base">
          <input
            ref={ref}
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
            onClick={() => submitRequest('mp4')}
            className="media-select-mp4"
          >
            <p>mp4</p>
          </div>

          <div
            onClick={() => submitRequest('mp3')}
            className="media-select-mp3s"
          >
            <p>mp3</p>
          </div>
        </div>
      </div>

      {loader && !emptySearch ? (
        <div className="loader">
          <img src="images/loader.gif" />
        </div>
      ) : (
        ''
      )}

      {Object.keys(searchResults).length ? (
        <SearchResults
          videoResults={searchResults.info.items}
          format={format}
        />
      ) : !loader ? (
        <Author />
      ) : (
        ''
      )}
      {emptySearch ? (
        <div className="error">
          <p>Empty Search!</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const dispatchState = (store) => {
  return {
    searchResults: store.click.media,
    errorMessage: store.click.error,
  };
};
const dispatchProps = (dispatch) => {
  return {
    getResults: (search) => dispatch(getSearchResults(search)),
    clearSearchResults: () => dispatch(clearSearch()),
  };
};
export default connect(dispatchState, dispatchProps)(App);
