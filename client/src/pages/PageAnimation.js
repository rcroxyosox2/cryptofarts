import { Transition } from 'react-transition-group';
import React, { useEffect, useState } from 'react';

const PageAnimation = ({ children }) => {
  const [pageLoaded, setPageLoaded] = useState(false);
  const pageAnimationTimeOpen = 500;
  const pageAnimationTimeClose = 200;
  let pageLeaveTimeout;


  useEffect(() => {
    setPageLoaded(true);
    return () => {
      pageLeaveTimeout && clearTimeout(pageLeaveTimeout);
    }
  }, [])

  const changePage = (func) => {
    setPageLoaded(false);
    setTimeout(() => {
      func();
    }, pageAnimationTimeClose);
  }

  return (
    <Transition in={pageLoaded} timeout={pageAnimationTimeOpen}>
      { pageAnimationState => children({pageAnimationState, changePage})}
    </Transition>
  );

};

export default PageAnimation;
