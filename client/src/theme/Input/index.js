import * as styles from './styles';

const Input = (props) => {
  return (
    <styles.InputStyle {...props} ref={props._ref} />
  );
}

export default Input;
