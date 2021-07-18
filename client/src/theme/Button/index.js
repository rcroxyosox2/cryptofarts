import * as styles from './styles';

const Button = ({ _ref, ...restOfProps }) => {
  return <styles.ButtonStyle {...restOfProps} ref={_ref} />
};

Button.defaultProps = {
  styleSize: 'default',
  styleType: 'default',
};

export default Button;
