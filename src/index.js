import axios from 'axios';
import displayResults from './results';
const loader = document.querySelector('.loader');
const input = document.querySelector('.input');
const searchResults = document.querySelector('.search_results');
const author = document.querySelector('.author');
const mp4button = document.querySelector('.media-select-mp4');
const mp3button = document.querySelector('.media-select-mp3s');
const errorComp = document.querySelector('.error');
loader.style.display = 'none';
errorComp.style.display = 'none';
const postSearch = (value, format) => {
  axios({
    url: '/search_videos',
    method: 'POST',
    data: { search: value },
  })
    .then((response) => {
      console.log(response);
      loader.style.display = 'none';
      displayResults(response.data.info.items, format);
    })
    .catch((error) => {
      loader.style.display = 'none';
      input.style.border = '1px solid #eb4559';
      errorComp.style.display = 'inline-block';
      console.error({ message: 'something went wrong', error });
    });
};

mp3button.addEventListener('click', () => {
  if (input.value) {
    input.style.border = '1px solid #e0e0e0';
    errorComp.childNodes[0].textContent = 'Something went wrong!';
  }
  loader.style.display = 'inline-block';
  errorComp.style.display = 'none';
  author.style.display = 'none';
  searchResults.innerHTML = '';
  postSearch(input.value, 'mp3');
});
mp4button.addEventListener('click', () => {
  if (input.value) {
    input.style.border = '1px solid #e0e0e0';
    errorComp.childNodes[0].textContent = 'Something went wrong!';
  }
  errorComp.style.display = 'none';
  loader.style.display = 'inline-block';
  author.style.display = 'none';
  searchResults.innerHTML = '';
  postSearch(input.value, 'mp4');
});
