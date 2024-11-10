import './App.css';
import SideMenu from './components/SideMenu.jsx';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import {Info, Training, Home} from './pages/index.js'
// import Page1 from './pages/Page1.js';

function App() {
  const routes = [
    {path: "info", element: <Info/>}, 
    {path: "training", element: <Training/>}, 
  ];
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <SideMenu/>
          <div id="mid-col">
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route index element={<Home />} />
                  {routes.map((route, i) => <Route key={i} path={route.path} element={route.element}/>)};
              </Route>
            </Routes>
          </div>
        </header>
      </div>
    </BrowserRouter>

  );
}

export default App;
