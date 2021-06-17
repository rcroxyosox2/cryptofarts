import * as styles from './styles';
import CoinStack from 'components/CoinStack';

const CoinStackImageTitleCombo = ({coins, title, Img}) => {
  return (
    <styles.CoinStackImageTitleComboStyle>
      <styles.TitleImgComboStyle>
        <h1>{title}</h1>
        <div className="imgContainer"><Img /></div>
      </styles.TitleImgComboStyle>
      <CoinStack coins={coins} />
    </styles.CoinStackImageTitleComboStyle>
  )
};

export default CoinStackImageTitleCombo;
