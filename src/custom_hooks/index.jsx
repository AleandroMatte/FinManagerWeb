import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const useTokenCheck = () => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const hasToken = localStorage.getItem('user_token');

    if (hasToken) {
      let exp = jwtDecode(hasToken).exp;
      if (Date.now() >= exp * 1000) {
        navigate('');
      }
    } else {
      navigate('');
    }
  }, []);
};

export default useTokenCheck;
