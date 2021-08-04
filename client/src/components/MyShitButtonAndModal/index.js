// import { useState, useEffect } from 'react' ;
// import { useLocation } from 'react-router-dom';
// import Button from 'theme/Button';
// import Modal from 'theme/Modal';
// import { paths } from 'Router';
// import CoinDetail from 'pages/CoinDetail';

// const MyShitButtonAndModal = (props) => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [initialLocation, setInitialLocation] = useState();
//   const location = useLocation();
//   const handleHistoryChanged = () => {
//     setModalOpen(false);
//     props.onModalClose();
//   }

//   const handleModalClose = () => {
//     window.history.replaceState(null, 'MyStuff', initialLocation || paths.overview);
//     setModalOpen(false);
//     props.onModalClose();
//   };

//   const handleClick = () => {
//     props.onClick();
//     setModalOpen(true);
//     window.history.pushState(null, 'MyStuff', paths.mestuff);
//   };

//   useEffect(() => {
//     setInitialLocation(location.pathname);
//   }, [])

//   useEffect(() => {
//     if (props.modalOpen) {
//       handleClick();
//     }

//     window.addEventListener('popstate', handleHistoryChanged);
//     return () => {
//       window.removeEventListener('popstate', handleHistoryChanged);
//     }
//   }, [props.modalOpen]);

//   const handleRowClick = (e, {coin}) => {
//     // console.log(props);
//     props.onRowClick(e, {coin});
//   }

//   return (
//     <>
//       <Modal isOpen={!!modalOpen} onModalClose={handleModalClose}>
//         <CoinDetail coinId={modalOpen} handleBackClick={handleModalClose} />
//       </Modal>
//       <Button styleType="neutralBordered" styleSize={props.styleSize} onClick={handleClick}> 
//         <img src={searchImg} />
//         Search
//       </Button>
//     </>
//   )
// }

// SearchButtonAndModal.defaultProps = {
//   styleSize: "small",
//   onRowClick: () => null,
//   onClick: () => null,
//   onModalClose: () => null,
// };

// export default SearchButtonAndModal;
