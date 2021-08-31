import {BrowserRouter, Route, Switch} from "react-router-dom";
import Allcontact from './components/contact/allcontact';
import Contact from './components/contact/contact';
import Home from "./components/home";
import Notexist from "./components/notexist";
import Reg from "./components/registerlogin/register"
import Log from "./components/registerlogin/signIn";
import Welcome from "./components/welcome";

const App=()=> {
  return (
    <div>
      <div>     
        <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Welcome}/>
        <Route exact path="/contact" component={Allcontact}/>
        <Route path="/signup" component={Reg} />
        <Route path="/login" component={Log} />
        <Route path="/home" component={Home}/>
        {/* <Route path="/profile" component={UserProfile} />
        <Route path="/userhomepage" component={UserHomePage}/>  */}
        <Route  component={Notexist}/>
        </Switch>
        </BrowserRouter>
       </div>
    </div>
  );
}

export default App;
