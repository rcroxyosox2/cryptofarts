import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import { CSSTransition } from 'react-transition-group';
import { useState, useEffect, useRef } from 'react';
import useDebounce from 'hooks/useDebounce';
import { search } from 'services/'
import CoinStack from 'components/CoinStack';
import Rainbow from 'components/Rainbow';
import Computer from 'components/Computer';
import PointTo from 'components/PointTo';
import Input from 'theme/Input';
import * as styles from './styles';
const controller = new AbortController();
const signal = controller.signal;

const Search = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, searchError] = useState(null);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef();
  const coinStackRef = useRef();
  const dbSearchTerm = useDebounce(term, 500);
  const MIN_CHARS = 3;

  useEffect(() => {

    if (dbSearchTerm.length < MIN_CHARS) {
      return;
    }

    if (dbSearchTerm) {
      search(dbSearchTerm).then((results) => {
        setIsSearching(false);
        setResults(results);
        searchError(null);
      }).catch((e) => {
        setIsSearching(false);
        searchError(e);
      });
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [dbSearchTerm]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setIsSearching(!!value && value.length >= MIN_CHARS);
    setTerm(value);
  }

  const setFocusOnInput = () => {
    inputRef.current.focus();
  }

  const handleKeyDown = (e) => {
    if (e.target == inputRef.current) {
      return;
    }
    if(e.keyCode === 191) {
      setTimeout(() => setFocusOnInput(),100);
    }
  }

  const handleFocus = () => {
    setFocused(true);
  }

  const handleBlur = () => {
    setFocused(false);
  }

  return (
    <styles.SearchStyle onKeyDown={handleKeyDown} tabIndex={-1} className={focused ? 'focused' : null}>
      <div className="resultsContainer">
        <div>
          <CSSTransition in={results.length} timeout={400}>
            <div className="resultsStackAndRainbow">
              <CoinStack coins={[...results]} animated={false} _ref={coinStackRef} />
              <Rainbow />
            </div>
          </CSSTransition>
          <CSSTransition in={results.length} timeout={400}>
            <div className="computerContainerStyle">
              <div className="scaleContainer">
                <Computer text={term || "the internet"} onClick={setFocusOnInput} subCopy={isSearching ? 'loading' : null} />
              </div>
            </div>
          </CSSTransition>
        </div>
        <CSSTransition in={results.length} timeout={400}>
          <div className="rainbowContainer">
            <Rainbow count={2} />
          </div>
        </CSSTransition>
      </div>
      <CSSTransition in={results.length} timeout={400}>
        <div className='searchContainer'>
          <PointTo type={PointTo.messageTypes.TYPEACOIN} />
          <Input value={term} onChange={handleSearch} _ref={inputRef} onFocus={handleFocus} onBlur={handleBlur} />
        </div>
      </CSSTransition>
    </styles.SearchStyle>
  );
}

export default Search;
