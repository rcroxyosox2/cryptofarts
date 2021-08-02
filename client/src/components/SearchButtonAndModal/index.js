import { useState, useEffect } from 'react' ;
import { useLocation } from 'react-router-dom';
import searchImg from './images/search.png';
import Button from 'theme/Button';
import Modal from 'theme/Modal';
import { paths } from 'Router';
import Search from 'pages/Search';

const SearchButtonAndModal = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialLocation, setInitialLocation] = useState();
  const location = useLocation();
  const handleHistoryChanged = () => {
    setModalOpen(false);
    props.onModalClose();
  }

  const handleModalClose = () => {
    window.history.replaceState(null, 'Search', initialLocation || paths.overview);
    setModalOpen(false);
    props.onModalClose();
  };

  const handleClick = () => {
    console.log(location);

    props.onClick();
    setModalOpen(true);
    window.history.pushState(null, 'Search', paths.search);
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
    <>
      <Modal isOpen={modalOpen} onModalClose={handleModalClose}>
        <Search handleCloseClick={handleModalClose} onRowClick={handleRowClick} />
      </Modal>
      <Button styleType="neutralBordered" styleSize={props.styleSize} onClick={handleClick}> 
        <img src={searchImg} />
        Search
      </Button>
    </>
  )
}

SearchButtonAndModal.defaultProps = {
  styleSize: "small",
  onRowClick: () => null,
  onClick: () => null,
  onModalClose: () => null,
};

export default SearchButtonAndModal;
