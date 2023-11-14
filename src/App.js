import Home from "./router/home/home.component";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./router/navigation/navigaton.component.jsx";
import Authentication from "./components/authentication/authentication.component.jsx";
import { Fragment } from "react";

const Shop = () => {
  return (
    <Fragment>
      <h1>Shopping page</h1>
    </Fragment>
  );
};
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />}></Route>
          <Route path="shop" element={<Shop />}></Route>
          <Route path="auth" element={<Authentication />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
