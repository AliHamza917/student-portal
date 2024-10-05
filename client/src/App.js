import logo from './logo.svg';
import Layout from "./global/layouts/layout";
import HomePage from "./pages/home";
import Login from "./pages/auth/login";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Signup from "./pages/auth/signup";
import {CookiesProvider, useCookies} from "react-cookie";

function App() {

    const [cookies] = useCookies(['Token'])
    const isLoggedIn = !!cookies.Token

  return (
      <CookiesProvider>

          <div className="App">
        <BrowserRouter>

            <Layout>
            <Routes>
                <Route path='/' element={isLoggedIn ? <Navigate to="dashboard-page" /> : <Login/>}/>
                <Route path='/sign-up' element={isLoggedIn ? <Navigate to="dashboard-page" /> : <Signup/>}/>

                    <Route path='/dashboard-page' element={!isLoggedIn ? <Navigate to="/" /> : <HomePage/>}/>


            </Routes>
            </Layout>
        </BrowserRouter>


    </div>

      </CookiesProvider>
  );
}

export default App;
