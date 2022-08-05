const getImagesAPI = {
  BASE_URL: 'https://pixabay.com/api/?',

  options: {
    key: '27649790-7921965d78458e948654f4c92',
    q: null,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 12,
  },

  lastData: null,

  fetchPictures: async function (query) {
    if (typeof query === 'string') {
      this.options.q = query;
      // console.log('query :>> ', query);
      this.options.page = 1;
    }

    const response = await this.newFetch();
    //  console.log('response :>> ', response);
    return this.getParsedData(response);
  },

  newFetch: async function () {
    const qs = new URLSearchParams(this.options);
    this.options.page += 1;
   //  console.log('this.options.page :>> ', this.options.page);
    return await fetch(this.BASE_URL + qs);
  },

  async getParsedData(response) {
    if (!response.ok) return null;

    const data = await response.json();
    if (!data.total) return null;
    this.lastData = data;
    return data;
  },

  checkIsFale() {
    const { page, per_page } = this.options;
    if (page - 1 >= Math.ceil(this.lastData.total / per_page)) return true;
  },
};

export { getImagesAPI };
