import React from 'react';
import PropTypes from 'prop-types'
import { Route, Switch, Redirect, routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error/'),
  })
  const routes = [
    {
      path: '/home',
      component: () => import('./routes/home/'),
    }, {
      path: '/lucky',
      models: () => [import('./models/lucky/lucky')],
      component: () => import('./routes/lucky/'),
    }, {
      path: '/pay',
      models: () => [import('./models/pay/pay')],
      component: () => import('./routes/pay/'),
    }, {
      path: '/love',
      component: () => import('./routes/love/'),
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/home" />)} />
              {
              routes.map(({ path, ...dynamics }, key) => (
                <Route key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
        <Route component={error} />
      </Switch>
    </ConnectedRouter>
  );
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers;
