import Gallery from "./components/Gallery/Gallery";
import Favorite from "./components/Favorite/Favorite";
import Layout from "./components/Layout/Layout";
import {
  Switch,
  Route,

} from "react-router-dom";

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Gallery />
        </Route>
        <Route exact path="/favorites">
          <Favorite />
        </Route>
      </Switch>
    </Layout>
  )
}

export default App;
