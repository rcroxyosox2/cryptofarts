import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
import { useState, useEffect, useRef } from 'react';
import useDebounce from 'hooks/useDebounce';
import { search } from 'services/'
import CoinStack from 'components/CoinStack';
import Input from 'theme/Input';
import * as styles from './styles';
const controller = new AbortController();
const signal = controller.signal;

const Search = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef();
  const resultsContainerRef = useRef();
  const dbSearchTerm = useDebounce(term, 500);

  useEffect(() => {
    if (dbSearchTerm) {
      setIsSearching(true);
      search(dbSearchTerm).then((results) => {
        setIsSearching(false);
        setResults(results);
        resultsContainerRef.current.scrollTop = 10000;
      }).catch((e) => setIsSearching(false));
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [dbSearchTerm]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setTerm(value);
  }

  const handleKeyDown = (e) => {
    if (e.target == inputRef.current) {
      return;
    }
    if(e.keyCode === 191) {
      setTimeout(() => inputRef.current.focus(),100);
    }
  }

  return (
    <styles.SearchStyle onKeyDown={handleKeyDown} tabIndex={-1}>
      <div>Top nav goes where</div>
      <div className='resultsContainer' ref={resultsContainerRef}>
        <CoinStack coins={[...results].reverse()} animated={false} />
      </div>
      <div className='searchContainer'>
        <Input value={term} onChange={handleSearch} _ref={inputRef} />
      </div>
    </styles.SearchStyle>
  );
}

export default Search;
