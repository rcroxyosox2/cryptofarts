import * as styles from './styles';

const Button = (props) => {
  return <styles.ButtonStyle {...props} />
};

Button.defaultProps = {
  styleSize: 'default',
  styleType: 'default',
};

export default Button;
