import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import MovieIcon from '@material-ui/icons/Movie';
import TvIcon from '@material-ui/icons/Tv';
import SearchIcon from '@material-ui/icons/Search';
import MyListIcon from '@material-ui/icons/Add';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useContext } from 'react';

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    bottom: 0,
    backgroundColor:"#2d313a",
    zIndex: 100,
  },
});
export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  useEffect(() => { 
    if (value === 0) history.push('/trending');
    else
    if (value === 1) history.push("/movies");
    else
      if (value === 2) history.push("/series");
    else
      if (value === 3) history.push("/mylist");
    else
      if (value === 4) history.push("/search");
    else
      if (value === 5) history.push("/login");
    else
      if (value === 6) history.push("/register");
    else
      if (value === 7) history.push("/logout");

  }, [value, history]);

  const { user, logout } = useContext(UserContext);
  const renderList = () => { }
 
  return (
    <div>
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={ classes.root}
    >
        {user.name &&
          
          <BottomNavigationAction
            style={{ color: "white" }}
            label="Trending"
            icon={<WhatshotIcon />} />
        }
        {user.name &&

          <BottomNavigationAction
            style={{ color: "white" }}
            label="Movies"
            icon={<MovieIcon />} />
        }
        {user.name &&

          <BottomNavigationAction
            style={{ color: "white" }}
            label="TV Series"
            icon={<TvIcon />} />
        }
        {user.name &&

          <BottomNavigationAction
            style={{ color: "white" }}
            label="MyList"
            icon={<MyListIcon />} />
        }
        {user.name &&

          <BottomNavigationAction
            style={{ color: "white" }}
            label="Search"
            icon={<SearchIcon />} />
        }
        <BottomNavigationAction
        style={{color: "white"}}
        label="Login"
        icon={<VpnKeyIcon />} />
        <BottomNavigationAction
        style={{color: "white"}}
        label="Register"
          icon={<AccountBoxIcon />} />

          <BottomNavigationAction
            style={{ color: "white" }}
            label="Logout"
            onClick={logout}
            icon={<ExitToAppIcon />} />
        

          <span style={{ color: "white", fontSize: 10}}     >
            Hello, {user.name}!
          </span>
        
      </BottomNavigation>
      
    
     
      </div>

  );
}