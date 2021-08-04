import macImg from 'images/mac.png';
import Button from 'theme/Button';
import * as styles from './styles';


const ErrorScreen = ({children, tryAgain = true, goBack = true } = {}) => {

  const handleTryAgainClick = () => {
    window.location.reload();
  };

  const handleGoBackClick = () => {
    window.history.back();
  }
  
  return (
    <styles.ErrorScreenStyle>
      <img src={macImg} alt="mac" />
      <span>{children || 'Uh oh something is busted'}</span>
      <footer>
        {tryAgain && <Button onClick={handleTryAgainClick}>try again</Button>}
        {(tryAgain && goBack) && <i>or</i>}
        {goBack && <Button onClick={handleGoBackClick}>go back</Button>}
      </footer>
    </styles.ErrorScreenStyle>
  );
};

export default ErrorScreen;
