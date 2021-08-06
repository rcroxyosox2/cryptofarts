import { useEffect } from 'react';
import * as styles from './styles';
import MyShitStack, { myShitSortDesc } from 'components/MyShitStack';
import { useLiveQuery } from "dexie-react-hooks";
import { getShit } from 'data/indexdb';
import Button from 'theme/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getShitThunk } from 'redux/myShit';
import PercChangeBox from 'components/PercChangeBox';
import FooterNav from 'components/FooterNav';

const FooterButton = (props) => <Button styleType="neutralInverseBordered" styleSize="small" {...props} />

export const MyShitPercChangeFlag = () => {
  const dispatch = useDispatch();
  const {data: perc, loading} = useSelector((state) => state.myShit);
  const coinsArr = useLiveQuery(() => getShit());
  let unmounted = false;
  
  
  useEffect(() => {
    (coinsArr?.length > 0) && dispatch(getShitThunk(coinsArr));
    return () => {
      unmounted = true;
    }
  }, [coinsArr]);
  
  return !loading ? (
    <PercChangeBox>{perc}</PercChangeBox>
  ) : null;
};

const MyShit = ({
  onBackClick = () => null,
} = {}) => {

  const handleBackClick = () => {
    onBackClick();
  }

  return (
    <styles.MyShitStyle>
      <header>
        <h1>Your Shit</h1>
        <MyShitPercChangeFlag />
      </header>
      
      <MyShitStack sort={myShitSortDesc} />
      <FooterNav leftNav={(
        <FooterButton onClick={handleBackClick}>Back</FooterButton>
      )} />
    </styles.MyShitStyle>
  );
}

export default MyShit;
