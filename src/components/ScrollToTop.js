import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Attempt to scroll both window and the document root
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0; // For some browsers
    document.body.scrollTop = 0; // For Safari
  }, [pathname]);

  return null;
};

export default ScrollToTop;