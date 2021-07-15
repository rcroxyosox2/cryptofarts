import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import sounds from 'sounds/';
import { setSoundLoadStatus } from 'redux/coins';
import Button from 'theme/Button';

export const SoundButton = ({soundIndex, onClick, onEnded, buttonProps, children} = {}) => {
  const [loading, setIsLoading] = useState(false);
  const ref = useRef();
  const handleCanPlayThrough = () => {
    console.log('ready.');
    setIsLoading(false);
  };

  const handleOnEnded = () => {
    onEnded && onEnded();
  }

  useEffect(() => {
    const current = ref.current;
    if (current) {
      current.load();
      current.addEventListener("canplaythrough", handleCanPlayThrough);
      current.addEventListener("ended", handleOnEnded);
      return () => {
        current.removeEventListener("canplaythrough", handleCanPlayThrough);
        current.removeEventListener("ended", handleOnEnded);
      }
    }
  }, [ref.current])

  const src = sounds[soundIndex];
  const handleClick = (e) => {
    ref.current.play();
    onClick && onClick(e);
  }

  if (!src) {
    console.log('no source for ', src, soundIndex);
  }

  return src ? (
    <>
      <audio controls ref={ref}>
          <source src={src} type="audio/mpeg" />
      </audio>
      <Button {...buttonProps} onClick={handleClick}>{children}</Button>
    </>
  ) : null;
}
