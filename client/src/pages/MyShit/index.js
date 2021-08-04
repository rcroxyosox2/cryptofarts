import * as styles from './styles';
import MyShitStack from 'components/MyShitStack';

const MyShit = ({
  handleDetailModalOpen,
  handleOnMyShit,
} = {}) => {
  return (
    <styles.MyShitStyle>
      <MyShitStack sort={myShitSort} onCoins={handleOnMyShit} onRowClick={handleDetailModalOpen} />
    </styles.MyShitStyle>
  );
}