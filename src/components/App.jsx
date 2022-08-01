import { Component } from 'react';
import getImages from 'services/services';
import ImageGallery from './ImageGallery';
import SearchBar from './SearchBar';
export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
  };

  componentDidUpdate(_, { searchQuery }) {
    if (searchQuery !== this.state.searchQuery) {
      this.getData();
    }
  }

  async getData() {
    const { searchQuery, page } = this.state;
    const { hits } = await getImages(searchQuery, page);
    this.setState(({ images }) => ({ images: [...images, ...hits] }));
  }

  handleFormSubmit = query => {
    this.setState({
      images: [],
      searchQuery: query,
      page: 1,
    });
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery pictures={images} />
      </>
    );
  }
}
