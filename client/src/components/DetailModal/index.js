import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { paths } from 'Router';
import Modal from 'theme/Modal';
import CoinDetail from 'pages/CoinDetail';

const DetailModal = ({closePath, coinId, onModalClose} = {}) => {
  const location = useLocation();
  const history = useHistory();
  const [initialLocation, setInitialLocation] = useState();

  const handleDetailModalClose = () => {
    window.history.replaceState(null, 'CoinDetail', closePath || initialLocation);
    onModalClose();
  };

  useEffect(() => {
    const newRoute = paths.coindetail.replace(':id', coinId);
    // && window.location.pathname !== newRoute
    if (coinId) {
      window.history.pushState(null, 'CoinDetail', newRoute);
    }
  }, [coinId])

  useEffect( async() => {
    setInitialLocation(location.pathname);
    window.addEventListener('popstate', handleDetailModalClose);
    return () => {
      window.history.replaceState(null, 'CoinDetail', closePath || initialLocation);
      window.removeEventListener('popstate', handleDetailModalClose);
    }
  }, []);

  return (
    <Modal isOpen={!!coinId} onModalClose={handleDetailModalClose}>
      <CoinDetail coinId={coinId} handleBackClick={() => window.history.back()} />
    </Modal>
  )
}

export default DetailModal;
