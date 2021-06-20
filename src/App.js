import "./App.css";
import Todos from "./todo/todos/Todos";
import { Route, Switch } from "react-router-dom";
import Header from "./shared/components/header/Header";

function App() {
  return (
    <div className="_app">
      <Header />

      <main className="_content_container">
        <Switch>
          <Route path="/todos">
            <Todos />
          </Route>
        </Switch>
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
