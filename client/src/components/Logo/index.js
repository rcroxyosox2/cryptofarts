import * as styles from './styles';
import logo from './images/logo.png';
import coin from './images/coin.png';

const Logo = () => {
  return (
    <styles.LogoStyle>
      <span><img src={coin} className="coinImg" alt="coin" /></span>
      <span><img src={logo} className="kripdoeImg" alt="Kripdoe" /></span>
    </styles.LogoStyle>
  );
};

export default Logo;
