import { useRef, useState, useEffect } from 'react';
import { CSSTransition, Transition, TransitionGroup } from 'react-transition-group';
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
  const Component = typeComponentMap[notif?.type];
  const timeout = useRef();

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
    <TransitionGroup>
      {Component && <Transition in={!!notif.text} timeout={500}>
        {(transition) => <Component animationState={transition}>{notif.text}</Component>}
      </Transition>}
    </TransitionGroup>
  )
}

export default Notif;
