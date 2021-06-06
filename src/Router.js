import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
export const paths = {
  home: '/',
  fourohfour: '*'
};


const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path={paths.home} component={Home} />
        <Route path={paths.fourohfour} component={() => <div>Four oh four</div>} />
      </Switch>
    </Router>
  );
}

export default Routes;