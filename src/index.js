import axios from 'axios';
import displayResults from './results';
// const form = document.querySelector('.form');
const loader = document.querySelector('.loader');
const input = document.querySelector('.input');
const searchResults = document.querySelector('.search_results');
const author = document.querySelector('.author');
const mp4button = document.querySelector('.media-select-mp4');
const mp3button = document.querySelector('.media-select-mp3s');
loader.style.display = 'none';

const postSearch = (value, format) => {
  axios({
    url: '/search_videos',
    method: 'POST',
    data: { search: value },
  })
    .then((response) => {
      loader.style.display = 'none';
      displayResults(response.data.info.items, format);
      //input.value = '';
    })
    .catch((error) => {
      loader.style.display = 'none';
      input.style.border = '1px solid #eb4559';
      console.log({ message: 'something went wrong', error });
    });
};

mp3button.addEventListener('click', () => {
  if (input.value) {
    input.style.border = '1px solid #e0e0e0';
  }
  loader.style.display = 'inline-block';
  author.style.display = 'none';
  searchResults.innerHTML = '';
  postSearch(input.value, 'mp3');
});
mp4button.addEventListener('click', () => {
  if (input.value) {
    input.style.border = '1px solid #e0e0e0';
  }
  loader.style.display = 'inline-block';
  author.style.display = 'none';
  searchResults.innerHTML = '';
  postSearch(input.value, 'mp4');
});
