import { BtnLoadMore } from './Button.styled';
const Button = ({ loadMore }) => (
  <BtnLoadMore type="button" onClick={loadMore}>
    loadMore
  </BtnLoadMore>
);
export default Button;
