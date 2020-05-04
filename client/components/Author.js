import React from 'react';

const Author = () => {
  let word = ' Github  ';
  return (
    <div className="author">
      <p>
        Youtube downloader is one of my experimental projects, and it’s fully
        functional. Due to the nature of the application, I can not guaranty how
        long it’s going to be working.
        <br />
        Check the
        <a href="https://github.com/Taulantvokshi/youtube-downloader">{word}</a>
        repo for implementation details. Thank You
        <br />
        <br />
      </p>

      <p>
        If you download more than 20 videos/songs a day I will throttle you : ^
        )
      </p>

      <br />
      <p>
        Created by
        <a href="https://www.linkedin.com/in/taulant-vokshi/">Taulant Vokshi</a>
      </p>
    </div>
  );
};

export default Author;
