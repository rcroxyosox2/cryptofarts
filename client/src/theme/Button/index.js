import * as styles from './styles';

const Button = ({ _ref, ...restOfProps }) => {
  const tagProps = {};
  if (restOfProps.tag) {
    tagProps.as = restOfProps.tag;
  };
  return (<styles.ButtonWrapperStyle {...tagProps}><styles.ButtonStyle {...restOfProps} ref={_ref} /></styles.ButtonWrapperStyle>)
};

Button.defaultProps = {
  styleSize: 'default',
  styleType: 'default',
};

export default Button;
