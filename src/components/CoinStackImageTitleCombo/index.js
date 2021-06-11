import * as styles from './styles';
import CoinStack from 'components/CoinStack';

const CoinStackImageTitleCombo = ({coins, title, imgProps}) => {
  return (
    <styles.CoinStackImageTitleComboStyle>
      <styles.TitleImgComboStyle>
        <h1>{title}</h1>
        <img {...imgProps} />
      </styles.TitleImgComboStyle>
      <CoinStack coins={coins} />
    </styles.CoinStackImageTitleComboStyle>
  )
};

export default CoinStackImageTitleCombo;
