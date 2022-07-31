async function getImages() {
  const API_KEY = '28157961-50aacf6d1ff0efe2e77cab6d2';

  return await fetch(
    `https://pixabay.com/api/?q=cat&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
}

export default getImages;
