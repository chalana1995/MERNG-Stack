import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <MenuBar />
      <Route exact to="/" component={Home} />
      <Route exact to="/login" component={Login} />
      <Route exact to="/register" component={Register} />
    </Router>
  );
}

export default App;
