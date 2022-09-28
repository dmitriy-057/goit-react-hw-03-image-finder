import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImage from '../utils/fetchImage';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    page: 1,
    nameImage: '',
    fetchedImage: [],
    loading: false,
    showModal: false,
    largeImgUrl: '',
  };

  componentDidUpdate(_, prevState) {
    const { page, nameImage, fetchedImage } = this.state;
    const { notify } = this;
    if (
      nameImage &&
      (nameImage !== prevState.nameImage || prevState.page !== page)
    ) {
      this.setState({ loading: true });
      fetchImage(nameImage, page)
        .then(({ data: { hits, totalHits } }) => {
          this.setState(prevState => ({
            fetchedImage: [...prevState.fetchedImage, ...hits],
            totalHits,
          }));
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.setState({ loading: false });
          if (!fetchedImage.length) {
            notify();
          }
        });
    }
    //  else if (!fetchedImage.length) {
    //   console.log('jdhdhd');
    //   notify();
    // }}
  }
  //  console.log(fetchedImage);
  //         if (fetchedImage.length === 0) {
  //           notify();
  //         }
  // const { notify } = this;
  //  const { notify } = this;
  //   if (fetchedImage.length === 0) {
  //     notify()
  //     return;
  //   }

  formSubmitHandler = newNameImage => {
    const { nameImage } = this.state;
    if (newNameImage !== nameImage) {
      this.setState({ page: 1, nameImage: newNameImage, fetchedImage: [] });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  takeLargeImgUrl = newUrl => {
    this.setState({ largeImgUrl: newUrl });
  };
  notify = () => toast('Not Found Image');
  render() {
    const { formSubmitHandler, loadMore, togleModal, takeLargeImgUrl } = this;
    const { fetchedImage, loading, showModal, largeImgUrl, totalHits } =
      this.state;
    return (
      <>
        <Searchbar onSubmit={formSubmitHandler} />
        <ImageGallery
          fetchedImage={fetchedImage}
          togleModal={togleModal}
          takeLargeImgUrl={takeLargeImgUrl}
        />
        {fetchedImage.length !== 0 && fetchedImage.length < totalHits && (
          <Button loadMore={loadMore} />
        )}
        {loading && (
          <Modal>
            <Loader />
          </Modal>
        )}
        {showModal && (
          <Modal onClose={togleModal}>
            <img src={largeImgUrl} alt="" />
          </Modal>
        )}
        <ToastContainer />
      </>
    );
  }
}
