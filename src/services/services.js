// import axios from 'axios';

async function getImages(searchQuery, page) {
  const API_KEY = '28157961-50aacf6d1ff0efe2e77cab6d2';
  const BASE_URL = 'https://pixabay.com/api/?';

  return await fetch(
    `${BASE_URL}q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
}

export default getImages;
