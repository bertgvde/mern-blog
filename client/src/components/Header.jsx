import { Avatar, Button, Navbar, TextInput, NavbarCollapse, NavbarLink, NavbarToggle, 
    Dropdown, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

export default function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user);
    const { theme } = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

      const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-lg'>
            <span className='px-2 py-1 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 rounded-lg text-white'>Quinlan's</span>
          <span className='text-blue-400 text-xl ml-2' >Blog</span>
        </Link>
        <form onSubmit={handleSubmit}>
            <TextInput 
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </form>
        <Button className='lg:hidden w-12' color='gray'>
            <AiOutlineSearch />
      </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className='w-12 h-10 hidden sm:inline' onClick={() => dispatch(toggleTheme())}>
                {theme === 'light' ? <FaMoon /> : <FaSun />}
            </Button>
            {currentUser ? (
            <Dropdown
                arrowIcon={false}
                inline
                label={
                <Avatar alt='user' img={currentUser.profilePicture} rounded />
                }
            >
                <DropdownHeader>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>
                    {currentUser.email}
                </span>
                </DropdownHeader>
                <Link to={'/dashboard?tab=profile'}>
                <DropdownItem>Profile</DropdownItem>
                </Link>
                <DropdownDivider />
                <DropdownItem onClick={handleSignout}>Sign out</DropdownItem>
            </Dropdown>
            ) : (
            <Link to='/sign-in'>
                <Button className='colorpy-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-2xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'>
                Sign In
                </Button>
            </Link>
            )}
            <NavbarToggle/>           
        </div>
        <NavbarCollapse>
                <NavbarLink active={path === '/'} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </NavbarLink>                
                <NavbarLink active={path === '/projects'} as={'div'}>
                    <Link to='/projects'>
                        Projects
                    </Link>
                </NavbarLink>
                <NavbarLink active={path === '/about'} as={'div'}>
                    <Link to='/about'>
                        About
                    </Link>
                </NavbarLink>
            </NavbarCollapse>
    </Navbar>
  )
}
