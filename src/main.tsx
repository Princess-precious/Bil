/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 06/09/2026 - 13:45:07
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 06/09/2026
    * - Author          : HP
    * - Modification    : 
**/

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider  from './AuthProvider.tsx'

createRoot(document.getElementById('root')!).render(
  
    <AuthProvider>
      <App />
    </AuthProvider>

  

)
