/**
    * @description      : 
    * @author           : HP
    * @group            : 
    * @created          : 03/10/2026 - 21:48:46
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 03/10/2026
    * - Author          : HP
    * - Modification    : 
**/
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { http } from '../https';
import { AuthService } from '../Auth/AuthService';

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const exchangeCode = async () => {
      const code = searchParams.get('code');

      if (!code) {
        navigate('/signin', { replace: true });
        return;
      }

      try {
        const response = await http.publicRequest(
          'POST',
          '/auth/google/exchange',
          { code },
        );

        const data = response.data.data;

        AuthService.login(data);

        navigate('/feed', { replace: true });
      } catch (error) {
        console.error('Google authentication failed:', error);
        navigate('/signin', { replace: true });
      }
    };

    exchangeCode();
  }, [searchParams, navigate]);

  return <div>Logging you in...</div>;
}
