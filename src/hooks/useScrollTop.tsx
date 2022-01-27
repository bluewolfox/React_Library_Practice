import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useScrollTop = () => {
  const navigation = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigation]);
};
