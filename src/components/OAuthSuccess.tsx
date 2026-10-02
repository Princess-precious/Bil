import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.log('🔥 OAUTH SUCCESS COMPONENT IS RUNNING');

    const code = searchParams.get('code');

    console.log('🔥 GOOGLE CODE:', code);
  }, [searchParams]);

  return <div>Google OAuth callback reached</div>;
}
