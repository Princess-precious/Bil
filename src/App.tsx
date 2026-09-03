/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 01/09/2026 - 16:59:17
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 01/09/2026
    * - Author          : HP
    * - Modification    : 
**/
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import CreateAccount from './pages/CreateAccount';
import Feed from './pages/Feed';
import DemoArticle from './pages/DemoArticle';
import SignIn from './pages/SignIn';
import NewStory from './pages/NewStory';
import UserProfile from './pages/UserProfile';

function App() {
    return(
        <BrowserRouter>
            <Routes>
<<<<<<< HEAD
                <Route path="/" element={<Home />} />
=======
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<SignUp />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/feed" element={<Feed/>}/>
                <Route path="/demoarticle" element={<DemoArticle/>}/>
>>>>>>> 554a508ed1256a0ab9f069e2e3c59d38129b574d
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/new-story" element={<NewStory />} />
                <Route path="/" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>

    );
}
export default App;