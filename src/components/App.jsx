import { Component } from 'react';
import getImages from 'services/services';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';

export class App extends Component {
  state = {
    images: [],
  };

  async componentDidMount() {
    const { hits } = await getImages();
    this.setState({
      images: hits,
    });
  }

  render() {
    const { images } = this.state;
    return (
      <>
        <Searchbar onSubmit={console.log} />
        <ImageGallery pictures={images} />
      </>
    );
  }
}
