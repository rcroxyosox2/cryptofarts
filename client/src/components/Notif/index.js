import { useRef, useState, useEffect } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { notifTypes, setNotif } from 'redux/notif';
import newspaper from 'images/newspaper.png';

import * as styles from './styles';

const NotifArticle = ({children, animationState}) => {
  return (
    <styles.NotifLoadingStyle className={animationState}>
      {children}
    </styles.NotifLoadingStyle>
  );
};

const NotifLoadingQuiet = ({children, animationState}) => {
  return (
    <styles.NotifLoadingStyle className={animationState}>
      <img src={newspaper} alt="news paper" />
      {children}
    </styles.NotifLoadingStyle>
  );
}

const typeComponentMap = {
  [notifTypes.ARTICLE]: NotifArticle,
  [notifTypes.LOADING_QUIET]: NotifLoadingQuiet,
};

const Notif = () => {
  const { notif } = useSelector((state) => state.notif);
  const dispatch = useDispatch();
  const Component = typeComponentMap[notif?.type] || NotifArticle;
  const timeout = useRef();

  if (timeout.current && !notif) {
    clearTimeout(timeout.current);
  }

  useEffect(() => {
    if (notif) {
      timeout.current = setTimeout(() => {
        dispatch(setNotif(null));
      }, notif.expires || 5000)
    }
    return () => {
      clearTimeout(timeout.current);
    }
  }, [notif, dispatch])

  return (
    <Transition in={!!notif?.type} timeout={500}>
    {(transition) => {
      return <Component animationState={transition}>{transition}</Component>
    }}
  </Transition>
  )
}

export default Notif;
