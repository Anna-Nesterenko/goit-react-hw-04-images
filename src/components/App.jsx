import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import getImages from 'services/services';
import ImageGallery from './ImageGallery';
import { SearchBar } from './Search/SearchBar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoader: false,
  };

  /*відрісовка зображень по пошуку*/
  componentDidUpdate(_, { searchQuery, page }) {
    if (searchQuery !== this.state.searchQuery) {
      this.getData();
    }
    if (page !== this.state.page) {
      this.getData();
    }
  }

  /*відрісовка зображень з бекенда*/
  getData = async () => {
    try {
      this.setState({ isLoader: true });
      const { searchQuery, page } = this.state;
      const { hits } = await getImages(searchQuery, page);

      this.setState(({ images }) => ({
        images: [...images, ...hits],
        isLoader: false,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  /*перша сторінка*/
  handleFormSubmit = query => {
    this.setState({
      images: [],
      searchQuery: query,
      page: 1,
    });
  };

  /*додає наступну сторінку*/
  addNextPage = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { images, isLoader, page } = this.state;

    const isNotLastPage = images.length / page === 12;
    //  const lastPage = images.length > 0 && images.length / page !== 12;
    const btnEnable = images.length > 0 && !isLoader && isNotLastPage;

    //  const notify = () =>
    //    toast(`We're sorry, but you've reached the end of search results`);

    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ToastContainer
          style={{ top: '5em' }}
          position="top-center"
          autoClose={2000}
          theme="colored"
        />
        <ImageGallery pictures={images} />
        {isLoader && <Loader />}
        {btnEnable && <Button onClickNextPage={this.addNextPage} />}
        {/* {lastPage && { notify }} */}
      </>
    );
  }
}
