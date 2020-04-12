const main = document.querySelector('.main');
const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const input = document.querySelector('.input');
const searchResults = document.querySelector('.search_results');

//const downloadButton = document.querySelector('.download-button');

const displayRelated = (list) => {
  list.forEach((video) => {
    //Each result container
    const container = document.createElement('div');
    container.className = 'container';

    //Image div
    const imageBox = document.createElement('div');
    imageBox.className = 'imageBox';
    const image = document.createElement('img');
    image.src = video.thumbnail;

    //Video Title
    const info = document.createElement('div');
    info.className = 'infoBox';
    const p = document.createElement('p');
    p.textContent = video.title.split('').slice(0, 45).join('') + '...';

    //Download Container
    const downloadContainer = document.createElement('div');
    const button = document.createElement('button');
    button.className = 'relatedButton';
    button.textContent = 'download';
    downloadContainer.className = 'download_container';
    downloadContainer.appendChild(button);

    button.addEventListener('click', (e) => {
      e.target.style.display = 'none';
      const downloadLoader = document.createElement('div');
      const loaderImage = document.createElement('img');
      downloadLoader.className = 'download_loader';
      loaderImage.setAttribute('src', 'images/loader.gif');
      downloadLoader.appendChild(loaderImage);
      downloadContainer.appendChild(downloadLoader);

      axios
        .post('/download_video', { url: video.link, title: video.title })
        .then((response) => {
          downloadLoader.style.display = 'none';
          e.target.style.display = 'inline-block';
          e.target.disabled = true;

          let a = document.createElement('a');

          const titleId = response.data.title;
          a.setAttribute('href', `./upload/${titleId}.mp4`);
          a.setAttribute('download', titleId);
          a.click();
        });
    });

    //APEND ACTIONS
    info.appendChild(p);
    imageBox.appendChild(image);
    container.appendChild(imageBox);
    container.appendChild(info);
    container.appendChild(downloadContainer);
    searchResults.appendChild(container);
  });
};

loader.style.display = 'none';

form.addEventListener('submit', (e) => {
  loader.style.display = 'inline-block';
  searchResults.innerHTML = '';
  e.preventDefault();
  axios({
    url: '/search_videos',
    method: 'POST',
    data: { search: e.target.input.value },
  })
    .then((response) => {
      loader.style.display = 'none';
      console.log(response.data, 'XOXOX');
      displayRelated(response.data.info.items);
      input.value = '';
    })
    .catch((error) => {
      console.log(error);
    });
});

// downloadButton.addEventListener('click', (e) => {
//   downloadButton.disabled = true;

//   if (state.videoId) {
//     console.log(state.videoId, 'hello');
//     const id = state.videoId;
//     let a = document.createElement('a');
//     a.setAttribute('href', `./upload/${id}.mp4`);
//     a.setAttribute('download', id);
//     a.click();
//     state.videoId = null;
//   }
// });
