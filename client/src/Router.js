import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Home from 'pages/Home';
import Splash from 'pages/Splash';
import Search from 'pages/Search';
import Overview from 'pages/Overview';
import MoonShot from 'pages/MoonShot';
import CoinDetail from 'pages/CoinDetail';

export const paths = {
  home: '/',
  overview: '/overview',
  search: '/search',
  moonshot: '/moonshot/:id',
  coindetail: '/coin/:id',
  fourohfour: '*'
};

const Test = () => {
  return "coming soon...";
};

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={paths.home} component={Splash} />
        <Route exact path={paths.search} component={(route) => {
          const handleCloseClick = () => route.history.push(paths.overview);
          return <Search handleCloseClick={handleCloseClick} />;
        }} />
        <Route path={paths.overview} component={() => <Overview />} />
        <Route path={paths.moonshot} component={() => <MoonShot isOpen />} />
        <Route path={paths.coindetail} component={(route) => {
          const handleBackClick = () => route.history.push(paths.overview);
          return <CoinDetail coinId={route?.match?.params?.id} handleBackClick={handleBackClick}/>;
        }} />
        {/* <Route path={paths.fourohfour} component={() => <div>Four oh four</div>} /> */}
      </Switch>
    </Router>
  );
}

export default Routes;