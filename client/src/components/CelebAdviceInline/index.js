import clintonYesImg from './images/clinton_no.gif';
import oprahNoImg from './images/oprah_yes.gif';
import { decision } from 'utils';
import * as styles from './styles';

// advices comes from a /api/coin/:id call
const CelebAdviceInline = ({ advice, onAdviceClick = () => null } = {}) => {
  const buy = advice.score > 0;
  const adviceText = buy ? 'BUY' : 'nah';
  const handleAdviceClick = (e) => {
    onAdviceClick(e, {buy})
  }
  return (
    <styles.CelebAdviceInlineStyle buy={buy}>
      <div><img src={buy ? oprahNoImg : clintonYesImg} /></div>
      <div>Official celebrity trade advice&trade;</div>
      <div onClick={handleAdviceClick}>{adviceText}</div>
    </styles.CelebAdviceInlineStyle>
  );
};

export default CelebAdviceInline;
