import { Formik, ErrorMessage } from 'formik';
import {
  SearchbarSection,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
  ErrorText,
} from './Searchbar.styled';
import * as yup from 'yup';

import { MdFindReplace } from 'react-icons/md';

const SearchSchema = yup.object().shape({
  searchbar: yup.string().trim().required('Enter valid name'),
});

export default function Searchbar({ onSubmit }) {
  const handleSabmit = ({ searchbar }, { resetForm }) => {
    onSubmit(searchbar);
    resetForm();
  };

  return (
    <SearchbarSection>
      <Formik
        initialValues={{ searchbar: '' }}
        validationSchema={SearchSchema}
        onSubmit={handleSabmit}
      >
        <SearchForm>
          <SearchFormButton type="submit">
            <MdFindReplace />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            name="searchbar"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <ErrorMessage name="searchbar" component={ErrorText} />
        </SearchForm>
      </Formik>
    </SearchbarSection>
  );
}
