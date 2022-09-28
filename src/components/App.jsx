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

  componentDidUpdate(_, prevState) {
    const { page, nameImage } = this.state;
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
        .finally(() => this.setState({ loading: false }));
    }
  }
  shouldComponentUpdate(_, nextState) {
    const { nameImage } = this.state;
    if (nameImage === nextState.nameImage) {
      return false;
    }
    return true;
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
      </>
    );
  }
}
// this.state.renderImages.length !== 0 &&
//   this.state.renderImages.length < this.state.totalItems;

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
