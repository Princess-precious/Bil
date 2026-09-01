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

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>

    );
}
export default App;