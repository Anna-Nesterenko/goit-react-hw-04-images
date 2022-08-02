import { Component } from 'react';
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

    console.log('page', this.state.page);
  };

  render() {
    const { images, isLoader } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery pictures={images} />
        {isLoader && <Loader />}
        <Button onClickNextPage={this.addNextPage} />
      </>
    );
  }
}
