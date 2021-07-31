import { useState, useEffect } from 'react';
import searchImg from './images/search.png';
import Button from 'theme/Button';
import Modal from 'theme/Modal';
import { paths } from 'Router';
import Search from 'pages/Search';

import * as styles from './styles';

const SearchButton = (props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleHistoryChanged = () => {
    setModalOpen(false);
    props.onModalClose();
  }

  const handleModalClose = () => {
    window.history.replaceState(null, 'Search', paths.search);
    setModalOpen(false);
    props.onModalClose();
  };

  const handleClick = () => {
    props.onClick();
    setModalOpen(true);
    window.history.pushState(null, 'Search', paths.search);
  };

  useEffect(() => {
    if (props.modalOpen) {
      handleClick();
    }

    window.addEventListener('popstate', handleHistoryChanged);
    return () => {
      window.removeEventListener('popstate', handleHistoryChanged);
    }
  }, [props.modalOpen]);

  return (
    <>
      <Modal isOpen={modalOpen} onModalClose={handleModalClose}>
        <Search handleCloseClick={handleModalClose} />
      </Modal>
      <Button styleType="neutralBordered" styleSize="small" onClick={handleClick}> 
        <img src={searchImg} />
        Search
      </Button>
    </>
  )
}

SearchButton.defaultProps = {
  onClick: () => null,
  onModalClose: () => null,
};

const MainFooter = (props) => {
  return (
    <styles.MainFooterStyle>
      <SearchButton onClick={props.handleSearchClick} onModalClose={props.onSearchModalClose} modalOpen={props.searchModalOpen} />
    </styles.MainFooterStyle>
  );
};

MainFooter.defaultProps = {
  handleSearchClick: () => null,
  onSearchModalClose: () => null,
}

export default MainFooter;
