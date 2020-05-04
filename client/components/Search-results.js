import React from 'react';
import axios from 'axios';
import FileSaver from 'file-saver';
const SearchResults = ({ videoResults, format }) => {
  return (
    <div className="search_results">
      {videoResults.map((video) => {
        return (
          <div key={video.link} className="container">
            <div className="imageBox">
              <img src={video.thumbnail} />
            </div>
            <div className="infoBox">
              <div className="titleBox">
                {video.title.length < 60 ? (
                  <p>{video.title}</p>
                ) : (
                  <p>{video.title.split('').slice(0, 60).join('') + '...'}</p>
                )}
              </div>
              <div className="details">
                <p>{'duration: ' + video.duration}</p>
                <p>{'views: ' + video.views}</p>
              </div>
            </div>
            <div className="download_container">
              <button
                type="submit"
                className="relatedButton"
                onClick={() => {
                  axios({
                    method: 'post',
                    url: '/api/download_video',
                    responseType: 'blob',
                    data: {
                      url: video.link,
                      title: video.title,
                      format,
                    },
                  })
                    .then((response) => {
                      const responseInfo = JSON.parse(response.config.data);
                      var file = new File(
                        [response.data],
                        responseInfo.title + '.' + responseInfo.format
                      );
                      FileSaver.saveAs(file);
                    })
                    .catch((error) => {
                      throw new Error(error);
                    });
                }}
              >
                Download
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
