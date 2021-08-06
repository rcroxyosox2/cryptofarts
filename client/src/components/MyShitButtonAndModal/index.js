import { useState, useEffect } from 'react' ;
import { useLocation } from 'react-router-dom';
import Button from 'theme/Button';
import Modal from 'theme/Modal';
import { paths } from 'Router';
import MyShitStack from 'components/MyShitStack';
import MyShitPage, { MyShitPercChangeFlag } from 'pages/MyShit';
import * as styles from './styles';

const MyShitButtonAndModal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialLocation, setInitialLocation] = useState();
  const location = useLocation();
  const handleHistoryChanged = () => {
    setModalOpen(false);
    props.onModalClose();
  }

  const handleModalClose = () => {
    window.history.replaceState(null, 'MyStuff', initialLocation || paths.overview);
    setModalOpen(false);
    props.onModalClose();
  };

  const handleClick = () => {
    props.onClick();
    setModalOpen(true);
    window.history.pushState(null, 'MyStuff', paths.yourshit);
  };

  useEffect(() => {
    setInitialLocation(location.pathname);
  }, [])

  useEffect(() => {
    if (props.modalOpen) {
      handleClick();
    }

    window.addEventListener('popstate', handleHistoryChanged);
    return () => {
      window.removeEventListener('popstate', handleHistoryChanged);
    }
  }, [props.modalOpen]);

  const handleRowClick = (e, {coin}) => {
    // console.log(props);
    props.onRowClick(e, {coin});
  }

  return (
    <styles.MyShitButtonAndModalStyle>
      <Modal isOpen={!!modalOpen} onModalClose={handleModalClose}>
        <MyShitPage onBackClick={() => window.history.back()} />
      </Modal>
      <div className="myShitWrap">
        <Button styleType="neutralBordered" styleSize={props.styleSize} onClick={handleClick}> 
          My Shit
        </Button>
        <MyShitPercChangeFlag />
      </div>
    </styles.MyShitButtonAndModalStyle>
  )
}

MyShitButtonAndModal.defaultProps = {
  styleSize: "small",
  onRowClick: () => null,
  onClick: () => null,
  onModalClose: () => null,
};

export default MyShitButtonAndModal;
