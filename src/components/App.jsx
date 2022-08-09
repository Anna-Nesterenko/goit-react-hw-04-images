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

  handleFormSubmit = searchName => {
    if (this.state.searchQuery === searchName) return;

    this.setState({
      images: [],
      searchQuery: searchName,
      page: 1,
      btnEnable: false,
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
      // this.handleScroll();
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
    document.documentElement.style.overflow = 'hidden';
  };

  closeModal = () => {
    this.setState({ contentModal: '', showModal: false });
    document.documentElement.style.overflow = null;
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
