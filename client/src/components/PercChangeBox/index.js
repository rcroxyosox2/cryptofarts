import * as styles from './styles';
import {
  numHasBigPump,
} from 'brains/coins';
import { formatPerc } from 'utils';

const PercChangeBox = ({ children }) => {
  const num = parseFloat(children);
  const bigPump = numHasBigPump(num);
  const red = num < 0;
  return (
    <styles.PercChangeBoxStyle bigPump={bigPump} red={red} green={!red}>
      {formatPerc(num)}
    </styles.PercChangeBoxStyle>
  );
}

export default PercChangeBox;
