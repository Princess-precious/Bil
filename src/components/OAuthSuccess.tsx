import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {  http } from '../lib/https';
import { AuthService } from '../lib/Auth/AuthService';

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
