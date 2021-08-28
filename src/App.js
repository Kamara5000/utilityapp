import {BrowserRouter, Route, Switch} from "react-router-dom";
import Allcontact from './contact/allcontact';
import Contact from './contact/contact';
import Notexist from "./notexist";

const App=()=> {
  return (
    <div>
      <div>     
        <BrowserRouter>
        <Switch>
        <Route exact path="/" component={Allcontact}/>
        <Route exact path="/contact" component={Contact}/>
        {/* <Route path="/signup" component={UserReg} />
        <Route path="/login" component={UserLog} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/userhomepage" component={UserHomePage}/> */}
        <Route  component={Notexist}/>
        </Switch>
        </BrowserRouter>
       </div>
    </div>
  );
}

export default App;
