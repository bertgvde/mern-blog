import { Footer, FooterLink, FooterTitle, FooterLinkGroup, FooterDivider, FooterCopyright, FooterIcon}from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-lg'>
                <span className='px-2 py-1 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 rounded-lg text-white'>Quinlan's</span>
                <span className='text-blue-400 text-xl ml-2' >Blog</span>
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <FooterTitle title='About' />
              <FooterLinkGroup col>
                <FooterLink
                  href='https://www.100jsprojects.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  100 JS Projects
                </FooterLink>
                <FooterLink
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Quinlan's Blog
                </FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title='Follow us' />
              <FooterLinkGroup col>
                <FooterLink
                  href='https://github.com/bertgvde'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </FooterLink>
                <FooterLink href='#'>Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title='Legal' />
              <FooterLinkGroup col>
                <FooterLink href='#'>Privacy Policy</FooterLink>
                <FooterLink href='#'>Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <FooterDivider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <FooterCopyright
            href='#'
            by="Quinlan's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <FooterIcon href='https://www.facebook.com/bert.gvde' icon={BsFacebook}/>
            <FooterIcon href='https://www.instagram.com/quillby/' icon={BsInstagram}/>
            <FooterIcon href='https://x.com/quillby2003' icon={BsTwitter}/>
            <FooterIcon href='https://github.com/bertgvde' icon={BsGithub}/>
          </div>
        </div>
      </div>
    </Footer>
  );
}
