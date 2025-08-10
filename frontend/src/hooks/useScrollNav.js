import { useEffect } from 'react';

export default function useScrollNav(navbarId = 'navbar') {
  useEffect(() => {
    const navbar = document.getElementById(navbarId);

    function onScroll() {
      // Shrink navbar when scrolling
      if (window.scrollY > 50) {
        navbar.classList.add('nav-shrink');
      } else {
        navbar.classList.remove('nav-shrink');
      }

      // Highlight active nav-link
      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });

      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [navbarId]);
}
