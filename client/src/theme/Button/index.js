import * as styles from './styles';

const Button = ({ _ref, ...restOfProps }) => {
  return (<styles.ButtonWrapperStyle><styles.ButtonStyle {...restOfProps} ref={_ref} /></styles.ButtonWrapperStyle>)
};

Button.defaultProps = {
  styleSize: 'default',
  styleType: 'default',
};

export default Button;
