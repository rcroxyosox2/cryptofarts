import numeral from 'numeral';
export const randomResource = (arr) => {
  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return arr[randomInteger(0, arr.length-1)]
}

// TODO: clean all this up when event.keyCode is dead
export const KEYCODES = {
  UP: { keyCode: 38, key: 'ArrowUp' },
  DOWN: { keyCode: 40, key: 'ArrowDown' },
  LEFT: { keyCode: 37, key: 'ArrowLeft' },
  RIGHT: { keyCode: 39, key: 'ArrowRight' },
  ENTER: { keyCode: 13, key: 'Enter' },
  SPACE: { keyCode: 32, key: ' ' },
  TAB: { keyCode: 9, key: 'Tab' },
  ESC: { keyCode: 27, key: 'Escape' }
};

// Gets a keycode from an event. If keyCodeObj (KEYCODES.UP for example) is passed, it will use the event to
// determine which to use - key or keyCode, then return the keyCodeObj's key or keyCode like so - KEYCODES.UP[key or keyCode]
export function getKeyCode(event, keyCodeObj) {

  if (!event) {
    return null;
  }

  let keyOrKeyCode;
  if (event.key) {
    keyOrKeyCode = 'key';
  } else if (event.keyCode) {
    keyOrKeyCode = 'keyCode';
  }

  if (!keyOrKeyCode) {
    return null;
  }

  if (keyCodeObj) {
    return keyCodeObj[keyOrKeyCode];
  } else {
    return event[keyOrKeyCode];
  }

}

export function formatPerc(n) {
  return `${n >= 0 ? '+' : ''}${numeral(n).format('0.0')}%`;
}

export function eventHasKeyCode(event, keyCodes) {

  const check = kc => {
    if (!kc) {
      return false;
    }
    const eventKeyCode = getKeyCode(event);
    const checkKeyCode = getKeyCode(event, kc);
    return String(eventKeyCode).toLowerCase() === String(checkKeyCode).toLowerCase();
  }

  if (Array.isArray(keyCodes)) {
    return keyCodes.some(check);
  } else {
    return check(keyCodes);
  }

};