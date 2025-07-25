import { Button, FloatingLabel, TextInput, Label } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function SignUp() {
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, perferendis?
          </p>
        </div>

        {/* right */}
        <div className='flex-1'>
            <form className="flex max-w-md flex-col gap-4">
              <div class="relative">
                  <input type="text" id="username" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label for="username" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Your username</label>
              </div>
              <div class="relative">
                  <input type="text" id="email" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label for="email" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Your email</label>
              </div>
              <div class="relative">
                  <input type="text" id="password" class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                  <label for="password" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
              </div>

              <Button type="submit" className='bg-inherit dark:text-black'>Submit</Button>
          </form>
          <div className='flex gap-3 text-sm mt-5'>
            
            <span className=''>Already signed up? </span>
            <Link to="/sign-in" className='text-blue-500 hover:underline dark:text-blue-700'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
