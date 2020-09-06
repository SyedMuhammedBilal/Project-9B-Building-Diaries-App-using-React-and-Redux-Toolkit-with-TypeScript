import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';
import Loading from '../Components/Loading';
import Homepage from '../Components/Homepage';

const Auth = lazy(() => import('../Features/auth/Auth'));
const Home = lazy(() => import('../Features/home/home'));

const App: FC = () => {
  const isLoggedIn = useSelector (
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Router>
      <Route exact path="/" component={Homepage} />
      <Switch>
        <Route path="/">
          <Suspense fallback={<Loading />}>
            {
              isLoggedIn ? <Home /> : <Auth />
            }
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
