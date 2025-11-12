

import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
      <nav className="bg-white shadow-lg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img className="h-20 w-auto" src="./img/logo/logogopintar.png" alt="Go-Pintar" />
            </div>


            {/* Login & Daftar */}
            <div className=" md:flex items-center space-x-4">
                 
              <NavLink
                to="/login"
                className=" hover:bg-green-700 hover:text-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium transition-colors">

                Login
                </NavLink>
              

                   <NavLink
                to="/daftar"
               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
      >
                Daftar
                </NavLink>
              
            </div>
          </div>
        </div>
      </nav>
  );
};


        {/* Navigation Links */}
{/* 
         <div className="md:hidden fixed bottom-0 left-0 z-50 w-full py-8 px-4 bg-white  border-t border-gray-200">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <a href="#herosection" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 group">
          <svg className="w-5 h-5 mb-1 text-black group-hover:text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
          </svg>
        </a>
        
        <a href="#about" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
          <svg className="w-5 h-5 mb-1 text-black group-hover:text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
          </svg>
        </a>
       
        
        <a href="#sertifikat" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 group">
          <svg className="w-6 h-6 text-black group-hover:text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7ZM8 16a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1-5a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clipRule="evenodd"/>
          </svg>
        </a>
        
        <a href="#portfolio" className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 group">
          <svg className="w-6 h-6 text-black group-hover:text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8.597 3.2A1 1 0 0 0 7.04 4.289a3.49 3.49 0 0 1 .057 1.795 3.448 3.448 0 0 1-.84 1.575.999.999 0 0 0-.077.094c-.596.817-3.96 5.6-.941 10.762l.03.049a7.73 7.73 0 0 0 2.917 2.602 7.617 7.617 0 0 0 3.772.829 8.06 8.06 0 0 0 3.986-.975 8.185 8.185 0 0 0 3.04-2.864c1.301-2.2 1.184-4.556.588-6.441-.583-1.848-1.68-3.414-2.607-4.102a1 1 0 0 0-1.594.757c-.067 1.431-.363 2.551-.794 3.431-.222-2.407-1.127-4.196-2.224-5.524-1.147-1.39-2.564-2.3-3.323-2.788a8.487 8.487 0 0 1-.432-.287Z"/>
          </svg>
        </a>
      </div>
    </div> */}
      


export default Navbar