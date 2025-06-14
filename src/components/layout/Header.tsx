'use client'

//import { useTheme } from 'next-themes';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { BsMoon } from 'react-icons/bs';
import { FiSun } from 'react-icons/fi';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import '@/styles/Header.css';

export default function Header() {
    const router = useRouter();
    const { theme, setTheme } = useTheme();
  
    const handleLogout = () => {
      Cookies.remove('jwt_token');
      router.push('/login');
    };
  
    const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };
  
    return (
      <header className='header'>
        <Image
          src="https://res.cloudinary.com/dvgymshsh/image/upload/v1694350601/music-logo_gykg7f.jpg"
          alt="header-logo" width={50} height={50}
          className="header-logo"
        />
        <div className="header-items">
          <button onClick={toggleTheme} className="theme-btn">
            {theme === 'dark' ? <FiSun size={25} /> : <BsMoon size={25} />}
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </header>
    );
}