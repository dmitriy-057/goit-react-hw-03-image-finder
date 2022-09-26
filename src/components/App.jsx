import { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import fetchImage from '../utils/fetchImage';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    page: 1,
    nameImage: '',
    fetchedImage: [],
    loading: false,
    showModal: false,
    largeImgUrl: '',
  };

  componentDidUpdate(prevProbs, prevState) {
    const { page, nameImage, fetchedImage } = this.state;

    if (
      (prevState.page !== page || prevState.nameImage !== nameImage) &&
      (prevState.fetchedImage !== fetchedImage || prevState.page !== page)
    ) {
      this.setState({ loading: true });
      setTimeout(() => {
        fetchImage(nameImage, page)
          .then(({ data: { hits } }) => {
            this.setState(prevState => ({
              fetchedImage: [...prevState.fetchedImage, ...hits],
            }));
          })
          .finally(() => this.setState({ loading: false }));
      }, 1000);
    }
  }

  formSubmitHandler = nameImage => {
    this.setState({ page: 1, nameImage, fetchedImage: [] });
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
  render() {
    const { formSubmitHandler, loadMore, togleModal, takeLargeImgUrl } = this;
    const { fetchedImage, loading, showModal, largeImgUrl } = this.state;
    return (
      <>
        <Searchbar onSubmit={formSubmitHandler} />
        <ImageGallery
          fetchedImage={fetchedImage}
          togleModal={togleModal}
          takeLargeImgUrl={takeLargeImgUrl}
        />
        {fetchedImage.length > 0 && <Button loadMore={loadMore} />}
        {loading && <Loader />}
        {showModal && (
          <Modal onClose={togleModal}>
            <img src={largeImgUrl} alt="" />{' '}
          </Modal>
        )}
      </>
    );
  }
}

// const { fetchedImage, status } = this.state;
// if (status === 'idle') {
//   return <Searchbar onSubmit={formSubmitHandler} />;
// }
// if (status === 'pending') {
//   return (
//     <>
//       <Searchbar onSubmit={formSubmitHandler} /> <Loader />;
//     </>
//   );
// }
// if (status === 'rejected') {
//   return <h2>ошибка </h2>;
// }
// if (status === 'resolved') {
//   return (
//     <>
//       <Searchbar onSubmit={formSubmitHandler} />;
//       <ImageGallery fetchedImage={fetchedImage} />
//       {fetchedImage.length > 0 && <Button loadMore={loadMore} />}
//     </>
//   );
// }
