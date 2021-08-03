import { useState, useEffect } from 'react';
import SearchButtonAndModal from 'components/SearchButtonAndModal';
import * as styles from './styles';

const MainFooter = (props) => {
  return (
    <styles.MainFooterStyle>
      <SearchButtonAndModal 
        onClick={props.handleSearchClick} 
        onModalClose={props.onSearchModalClose} 
        modalOpen={props.searchModalOpen} 
        onRowClick={props.handleDetailModalOpen}
      />
    </styles.MainFooterStyle>
  );
};

MainFooter.defaultProps = {
  handleDetailModalOpen: () => null,
  handleSearchClick: () => null,
  onSearchModalClose: () => null,
}

export default MainFooter;