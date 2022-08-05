import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from 'services/serveces';
import ImageGallery from './ImageGallery';
import { SearchBar } from './Search/SearchBar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import Modal from './Modal';

export class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoader: false,
    showModal: false,
    contentModal: '',
  };

  toggleLoader = () => {
    this.setState(({ isLoader }) => ({ isLoader: !isLoader }));
  };

  //   toggleModal = () => {
  //     this.setState(({ showModal }) => ({ showModal: !showModal }));
  //   };

  handleFormSubmit = searchName => {
    this.setState({
      images: [],
      searchQuery: searchName,
      page: 1,
    });
  };

  /*відрісовка зображень по пошуку*/
  componentDidUpdate(_, { searchQuery, page }) {
    if (searchQuery !== this.state.searchQuery || page !== this.state.page) {
      this.getData();
    }
  }

  getData = async () => {
    try {
      this.toggleLoader();
      const { searchQuery, page } = this.state;
      const { hits } = await getImages(searchQuery, page);
      if (hits.length < 1)
        await toast.error('Sorry, this is not correct. Try it differently');

      await this.setState(({ images }) => ({
        images: [...images, ...hits],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.toggleLoader();
    }
  };

  addNextPage = async () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  openModal = image => {
    this.setState({ contentModal: image, showModal: true });
  };

  closeModal = () => {
    this.setState({ contentModal: '', showModal: false });
  };

  render() {
    const { images, isLoader, page, showModal, contentModal, searchQuery } =
      this.state;

    const isNotLastPage = images.length / page === 12;
    const btnEnable = images.length > 0 && !isLoader && isNotLastPage;

    return (
      <>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery pictures={images} onImgClick={this.openModal} />
        <ToastContainer
          style={{ top: '5em' }}
          position="top-center"
          autoClose={2000}
          theme="colored"
        />
        {isLoader && <Loader />}
        {btnEnable && <Button onClickNextPage={this.addNextPage} />}
        {showModal && (
          <Modal onCloseModal={this.closeModal}>
            <img src={contentModal} alt={searchQuery} />
          </Modal>
        )}
      </>
    );
  }
}

// import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import * as API from 'services/services';
// import ImageGallery from './ImageGallery';
// import { SearchBar } from './Search/SearchBar';
// import { Loader } from './Loader/Loader';
// import { Button } from './Button/Button';

// export class App extends Component {
//   state = {
//     images: [],
//     q: '',
//     page: 1,
//      isLoader: false,
//   };

/*відрісовка зображень з бекенда*/
//   async componentDidMount() {
//     const images = await API.getImages();
//     this.setState({ images });
//     console.log('images :>> ', images);
//  this.setState({ isLoader: true });
//  const { page } = this.state;
//  const { hits } = await getImages(q, page);

//  this.setState({
//    images: hits,
//    q,
// isLoader: false,
//  });
//   }

/*додає наступну сторінку*/
//   addNextPage = async () => {
//     await this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//     const { searchQuery, page } = this.state;
//     const { hits } = await getImages(searchQuery, page);

//     this.setState(({ images }) => ({
//       images: [...images, ...hits],
//       isLoader: false,
//     }));
//   };
//   notify = () => {
//     return toast(`We're sorry, but you've reached the end of search results`);
//   };

//   render() {
//  console.log('images :>> ', this.state.images);

//  const { images, isLoader, page } = this.state;

//  const isNotLastPage = images.length / page === 12;
//  const btnEnable = images.length > 0 && isNotLastPage;
//  const lastPage = images.length > 0 && images.length / page !== 12;
//  const notify = () =>
//    toast(`We're sorry, but you've reached the end of search results`);

//  return (
//    <>
//      <SearchBar onSubmit={this.getData} />
//      <ImageGallery pictures={this.state.images} />
//    </>
//  );
// {
/* <ToastContainer
          style={{ top: '5em' }}
          position="top-center"
          autoClose={2000}
          theme="colored"
        /> */
// }
// {
/* {isLoader && <Loader />}
        {btnEnable && <Button onClickNextPage={this.addNextPage} />} */
// }
// {
/* {lastPage && this.notify} */
// }
//   }
// }
