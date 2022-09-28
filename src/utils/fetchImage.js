import axios from 'axios';
const KEY = '29177919-9234bb4fcf0eb813bd521d382';
const PER_PAGE = 12;
const fetchImage = async (nameImage, numberOfPage) => {
  const response = axios.get('https://pixabay.com/api/', {
    params: {
      key: KEY,
      q: nameImage,
      page: numberOfPage,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: PER_PAGE,
    },
  });
  return response;
};
export default fetchImage;

// id - уникальный идентификатор
// webformatURL - ссылка на маленькое изображение для списка карточек
// largeImageURL - ссылка на большое изображение для модального окна

// import axios from 'axios';
// const KEY = '29177919-9234bb4fcf0eb813bd521d382';
// const PER_PAGE = 12;
// const fetchImage = async (nameImage, numberOfPage) => {
//   try {
//     const response = axios.get('https://pixabay.com/api/', {
//       params: {
//         key: KEY,
//         q: nameImage,
//         page: numberOfPage,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         per_page: PER_PAGE,
//       },
//     });

//     return response;
//   } catch (error) {
//     console.log('Ошибка', error);
//   }
// };
// export default fetchImage;
