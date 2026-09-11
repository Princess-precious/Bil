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
import Feed from './pages/Feed';
import DemoArticle from './pages/DemoArticle';
import SignIn from './pages/SignIn';
import NewStory from './pages/NewStory';
import UserProfile from './pages/UserProfile';
import EditStory from './pages/EditStory';
import ForgetPassword from './pages/ForgetPassword';
import ChangePassword from './pages/ChangePassword';

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/feed" element={<Feed/>}/>
                <Route path="/demoarticle" element={<DemoArticle/>}/>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/new-story" element={<NewStory />} />
                <Route path="/edit-story/:id" element={<EditStory />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/forget-password" element={<ForgetPassword />} />
                <Route path="/change-password" element={<ChangePassword />} />
           
               </Routes>
            </BrowserRouter>

    );
}
export  default App;