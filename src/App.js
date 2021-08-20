import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './components/home/Home';
import Details from './components/details/Details';
import store from './redux/configureStore';
import './App.css';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/details/:country',
    name: 'Details',
    component: Details,
  },
];

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        {routes.map(({ path, component }) => (
          <Route key={path} exact path={path} component={component} />
        ))}
      </Switch>
    </Router>
  </Provider>
);

export default App;
