import { Button, FloatingLabel, TextInput, Label, Alert, Spinner } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  if (!formData.username || !formData.email || !formData.password) {
    setErrorMessage('Please fill in all fields');}

    try {
      setLoading(true);
      setErrorMessage
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (response.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage('An error occurred while signing up. Please try again later.', error);
      setLoading(false);
    }
  };
  return (
    <div className='min-h-screen mt-20 bg-inherit dark:text-black'>
      
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to="/" className='font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 rounded-lg text-4xl text-white'>Quinlan's</span>
            <span className='text-black text-4xl ml-2' >Blog</span>
          </Link>
          <p className='text-sm mt-5'>
            You can sign up here to create a new account. Please fill in your username, email, and password to get started.
          </p>
        </div>

        {/* right */}
        <div className='flex-1'>
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
              <div class="relative">
                  <TextInput type="text" id="username" class="block px-2.5 pb-2.5 pt-4 w-full text-sm rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="user1" onChange={handleChange}/>
                  <label for="username" class="absolute text-sm text-blue-700 dark:text-blue-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-blue-900 dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Your username</label>
              </div>
              <div class="relative">
                  <TextInput type="email" id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="user1@email.com" onChange={handleChange}/>
                  <label for="email" class="absolute text-sm text-blue-700 dark:text-blue-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-blue-900 dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Your email</label>
              </div>
              <div class="relative">
                  <TextInput type="password" id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder="password" onChange={handleChange}/>
                  <label for="password" class="absolute text-sm text-blue-700 dark:text-blue-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-blue-900 dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
              </div>

              <Button type="submit" className='bg-inherit dark:text-black' disabled={loading}>                               
                  {loading ? (
                    <>
                    <Spinner size='sm' />
                    <span>Loading...</span>
                  </>
                ) : 'Sign Up'}              
              </Button>
          </form>
          <div className='flex gap-3 text-sm mt-5'>
            
            <span className=''>Already signed up? </span>
            <Link to="/sign-in" className='text-blue-500 hover:underline dark:text-blue-700'>
              Sign in
            </Link>
          </div>
          {errorMessage && (
            <Alert color="failure" className="mt-5">
              {errorMessage}
            </Alert>)}
          
        </div>
      </div>
    </div>
  )
}

