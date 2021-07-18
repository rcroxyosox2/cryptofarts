import { useEffect, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useHistory, useParams } from 'react-router-dom';
import useRequest from 'hooks/useRequest';
import { paths } from 'Router';
import { getMoonShot } from 'services/';
import Button from 'theme/Button';
import { getMoonShotsThunk } from 'redux/moonshots';
import marked from 'marked';
import { useSelector, useDispatch } from 'react-redux';
import { Stars, MAX_RESULTS } from 'components/Moonshots';
import moonImg from 'components/Moonshots/images/moon.png';
import msGirlsImg from 'components/Moonshots/images/msgirls.png';
import copy from 'copy-to-clipboard';
import * as styles from './styles';

const FooterButton = (props) => <Button styleType="neutralInverseBordered" {...props} />

const MoonShot = (props) => {
  const [copied, setCopied] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { data: moonShots } = useSelector((state) => state.moonShots);
  const history = useHistory();
  const parentRef = useRef();
  const request = useRequest({
    request: getMoonShot
  });
  const getShotId = () => {
    return selectedId || params.id || props.id;
  }

  useEffect(() => {
    console.log(mounted);
    if (request.response && !mounted) {
      setMounted(true);
    }
  }, [request.response]);

  useEffect(() => {
    const shotId = getShotId();
    !!shotId && request.makeRequest(shotId);
    
    if (!moonShots.length) {
      dispatch(getMoonShotsThunk(MAX_RESULTS));
    }
  }, [getShotId()])

  const shot = request.response;
  const handleContractBoxClick = () => {
    setCopied(true);
    copy(shot.contractData.contract);
    setTimeout(() => setCopied(false), 1000);
  }

  const getShotIndex = () => {
    return Array.isArray(moonShots) ? moonShots.findIndex((shot) => shot.id === getShotId()) : null;
  }

  const hasPrevIndex = (index) => {
    const shotIndex = index ?? getShotIndex();
    return (shotIndex > 0);
  }

  const hasNextIndex = (index) => {
    const shotIndex = index ?? getShotIndex();
    return (shotIndex < moonShots.length - 1);
  }

  const handleCloseClick = () => {
    setMounted(false);
    if (props.onClose) {
      props.onClose();
    } else {
      history.replace(paths.overview);
    }
  }

  const handlePrevNextShot = (incDec) => () => {

    if (request.loading) {
      return;
    }

    // debugger;
    const currentIndex = getShotIndex();
    if (currentIndex === -1) {
      return;
    }

    const newIndex = currentIndex + incDec;
    // decrementing
    if (
      (incDec < 0 && hasPrevIndex(currentIndex)) 
      || 
      (incDec > 0 && hasNextIndex(currentIndex))
    ) {

      const newShotId = moonShots[newIndex]?.id;
      if (newShotId) {
        const newRoute = paths.moonshot.replace(':id', newShotId);
        window.history.replaceState(null, 'MoonShot', newRoute);
        setSelectedId(newShotId);
      }
    }
  };

  // shot?.body && console.log(mdToHTML(shot.body))
  const body = shot?.body ? marked(shot.body) : '';
  const loading = request.loading;
  return (
    <styles.MoonShotStyle ref={parentRef}>
      {props.isOpen && <styles.GlobalStyle /> }

      <CSSTransition in={!loading} timeout={300}>
        <styles.ImageAreaStyle>
          <img src={moonImg} className="moonImg" />
          <img src={msGirlsImg} className="girlzImg" />
          <Stars />
        </styles.ImageAreaStyle>
      </CSSTransition>

      <CSSTransition in={!loading} timeout={300}>
        <styles.MainContentStyle>
          <header>
            <h1>{shot?.contractData?.name}</h1>
          </header>
          <div className="contractBox" onClick={handleContractBoxClick}>
            <CSSTransition in={copied} timeout={300}>
              <styles.CopiedStyle>
                Copied to teh clipboard!
              </styles.CopiedStyle>
            </CSSTransition>
            {shot?.contractData?.contract}
            <i />
          </div>
          <h2>{shot?.title}</h2>
          <div className="content" dangerouslySetInnerHTML={{__html: body}} />
        </styles.MainContentStyle>
      </CSSTransition>

      <CSSTransition in={loading} timeout={300}>
        <styles.LoadingStyle>
          Loading...
        </styles.LoadingStyle>
      </CSSTransition>

      <CSSTransition in={mounted} timeout={300}>
        <styles.FooterStyle>
          <div>
            <FooterButton onClick={handleCloseClick}>
              close
            </FooterButton>
          </div>
          <div>
            <FooterButton onClick={handlePrevNextShot(-1)} disabled={!hasPrevIndex()}>
              prev
            </FooterButton>
            <FooterButton onClick={handlePrevNextShot(1)} disabled={!hasNextIndex()}>
              next
            </FooterButton>
          </div>
        </styles.FooterStyle>
      </CSSTransition>
    </styles.MoonShotStyle>
  );
};

export default MoonShot;
