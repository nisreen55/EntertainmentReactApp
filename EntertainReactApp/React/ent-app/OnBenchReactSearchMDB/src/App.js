import './App.css';
import Header from './component/header/Header';
import SimpleBottomNavigation from './component/MainNav';
import { BrowserRouter , Switch,  Route} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Trending from './Pages/Trending/Trending';
import Movies from './Pages/Movies/Movies';
import MyList from './Pages/MyList/MyList';
import Search from './Pages/Search/Search';
import Series from './Pages/Series/Series';
import Login from './login/Login';
import Register from './register/Register';
import { useContext } from 'react';
import { UserContext } from './UserContext';

function App() {
  const { user } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Header />
      <div className="app">
        <Container>
          <Switch>
            {
              user.name &&
              <Route path='/trending' component={Trending} exact />}
              <Route path='/movies' component={Movies} />
              <Route  path='/series' component={Series}/>
              <Route  path='/mylist' component={MyList}/>
              <Route path='/search' component={Search} />
              <Route path='/login' component={Login} />
              <Route  path='/register' component={Register}/>
              <Route  path='/logout'/>
          </Switch>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}
export default App;
