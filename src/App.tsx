import './App.css'
import HomePage from "./pages/home/HomePage.tsx";
import LoginPage from "./pages/login/LoginPage.tsx";
import RegisterPage from "./pages/register/RegisterPage.tsx";
import {Route, Routes} from "react-router";
import NotFoundPage from "./pages/NotFound/NotFoundPage.tsx";
import SLayout from "./components/SLayout/SLayout.tsx";

function App() {

    console.log('Рендер App Component')

    return (
        <>
            {/*<SNavbar/>*/}
            <Routes>
                <Route path="/" element={<SLayout/>}>
                    <Route index element={<HomePage/>} />
                    <Route path={"login"} element={<LoginPage/>} />
                    <Route path={"*"} element={<NotFoundPage/>} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Routes>
        </>
    )
}

export default App
