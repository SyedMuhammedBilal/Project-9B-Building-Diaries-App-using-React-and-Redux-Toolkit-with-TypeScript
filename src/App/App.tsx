import React, { FC, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../rootReducer';

const Auth = lazy(() => import('../Features/auth/Auth'));
const Home = lazy(() => import('../Features/home/home'));

const App: FC = () => {
  const isLoggedIn = useSelector (
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Router>
      <Switch>
        <Route path="/">
          <Suspense fallback={<h3>Loading...</h3>}>
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
