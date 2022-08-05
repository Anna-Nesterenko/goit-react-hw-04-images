import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImagesAPI } from 'services/servicesNew';
import ImageGallery from './ImageGallery';
import { SearchBar } from './Search/SearchBar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    images: [],
    isLoader: false,
    btnEnable: false,
  };

  toggleLoader = () => {
    this.setState(({ isLoader }) => ({ isLoader: !isLoader }));
  };

  getData = async query => {
    this.toggleLoader();

    const data = await getImagesAPI.fetchPictures(query);
    if (data === null)
      return toast.error('Sorry, this is not correct. Try it differently');

    const isFale = !getImagesAPI.checkIsFale();

    this.setState(prevState => {
      const images =
        typeof query === 'string'
          ? [...data.hits]
          : [...prevState.images, ...data.hits];

      return {
        images,
        btnEnable: isFale,
      };
    });
    this.toggleLoader();
  };

  render() {
    const { images, isLoader, btnEnable } = this.state;

    return (
      <>
        <SearchBar onSubmit={this.getData} />
        <ImageGallery pictures={images} />
        <ToastContainer
          style={{ top: '5em' }}
          position="top-center"
          autoClose={2000}
          theme="colored"
        />
        {isLoader && <Loader />}
        {btnEnable && <Button onClickNextPage={this.getData} />}
      </>
    );
  }
}
