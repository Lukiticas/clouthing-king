import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/Home.component";
import Nav from "./routes/nav/Nav.component";
import SignIn from "./routes/signIn/SignIn.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route index element={<Home />} />
        <Route path="signIn" element={<SignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
