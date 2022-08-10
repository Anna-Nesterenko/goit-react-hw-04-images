import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';
import { getImages } from 'services/serveces';
import ImageGallery from './ImageGallery';
import { SearchBar } from './Search/SearchBar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import Modal from './Modal';

export function App() {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const toggleLoader = () => {
    setIsLoader(isLoader => !isLoader);
  };

  //   /*з'єднання пошуку з SearchBar*/
  const handleFormSubmit = searchName => {
    if (searchQuery === searchName) return;

    setImages([]);
    setSearchQuery(searchName);
    setPage(1);
    setIsVisible(false);
  };

  //   /*відрісовка зображень по пошуку*/
  useEffect(() => {
    if (!searchQuery) return;

    if (page === 1) {
      scroll.scrollMore(50);
    } else {
      scroll.scrollMore(400);
    }

    const getData = async () => {
      try {
        toggleLoader();
        const { hits, total } = await getImages(searchQuery, page);
        if (hits.length < 1)
          toast.error('Sorry, this is not correct. Try it differently');

        setImages(prevState => [...prevState, ...hits]);
        setIsVisible(page < Math.ceil(total / 12));
      } catch (error) {
        console.log(error);
      } finally {
        toggleLoader();
      }
    };

    getData();
  }, [searchQuery, page]);

  const addNextPage = () => {
    setPage(prevState => prevState + 1);
  };

  const openModal = image => {
    setShowModal(true);
    setContentModal(image);
    document.documentElement.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    setContentModal('');
    document.documentElement.style.overflow = null;
  };

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      <ImageGallery pictures={images} onImgClick={openModal} />
      <ToastContainer
        style={{ top: '5em' }}
        position="top-center"
        autoClose={2000}
        theme="colored"
      />
      {isLoader && <Loader />}
      {isVisible && <Button onClickNextPage={addNextPage} />}
      {showModal && (
        <Modal onCloseModal={closeModal}>
          <img src={contentModal} alt={searchQuery} />
        </Modal>
      )}
    </>
  );
}
