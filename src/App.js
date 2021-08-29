import {BrowserRouter, Route, Switch} from "react-router-dom";
import Allcontact from './contact/allcontact';
import Contact from './contact/contact';
import Home from "./home";
import Notexist from "./notexist";
import Reg from "./register";
import Log from "./signIn";

const App=()=> {
  return (
    <div>
      <div>     
        <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/contact" component={Contact}/>
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
