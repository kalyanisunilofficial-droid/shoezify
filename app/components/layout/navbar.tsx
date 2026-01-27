"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
// import LanguageSwitcher from "./LanguageSwitcher";

function Navbar({ navText }: { navText: any }) {
  const pathName = usePathname();
  const params = useParams();
  console.log("Navbar navText:", navText);
  // Get the current locale from the URL (e.g., 'en' or 'ml')
  const locale = params.locale as string;

  // Helper to check if the link is active
  const isActive = (href: string) => {
    // This matches the current URL against the link destination
    return pathName === href;
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 py-2.5">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
          
          {/* LOGO */}
          <Link href={`/${locale}`} className="flex items-center">
            <img src="/images/shoes-14-svgrepo-com.svg" className="h-6 mr-3 sm:h-9" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-black">shoezify</span>
          </Link>

          <div className="flex items-center lg:order-2">
            {/* LOGIN */}
            <Link 
              href={`/${locale}/nonav/login`}
              className="text-white bg-gray-800 hover:bg-black font-medium rounded-lg text-sm px-4 py-2 mr-2"
            >
             {navText?.login || "Login"}
            </Link>
             
           <LanguageSwitcher />
          </div>

          <div className="items-center justify-between w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              
              {/* HOME */}
              <li>
                <Link 
                  href={`/${locale}`}
                  className={isActive(`/${locale}`) 
                    ? "block py-2 pl-3 pr-4 text-purple-700 font-bold" 
                    : "block py-2 pl-3 pr-4 text-gray-700 hover:text-purple-700"}
                >
                 {navText?.home || "Home"}
                </Link>
              </li>
              
              {/* ABOUT */}
              <li>
                <Link 
                  href={`/${locale}/withNavbar/about`}
                  className={isActive(`/${locale}/withNavbar/about`) 
                    ? "block py-2 pl-3 pr-4 text-purple-700 font-bold" 
                    : "block py-2 pl-3 pr-4 text-gray-700 hover:text-purple-700"}
                >
              {navText?.about || "About"}
                </Link>
              </li>

              {/* TEAM */}
              <li>
                <Link 
                  href={`/${locale}/team`}
                  className={isActive(`/${locale}/team`) 
                    ? "block py-2 pl-3 pr-4 text-purple-700 font-bold" 
                    : "block py-2 pl-3 pr-4 text-gray-700 hover:text-purple-700"}
                >
              {navText?.about || "Team"}
                </Link>
              </li>

              {/* CONTACT */}
              <li>
                <Link 
                  href={`/${locale}/contact`}
                  className={isActive(`/${locale}/contact`) 
                    ? "block py-2 pl-3 pr-4 text-purple-700 font-bold" 
                    : "block py-2 pl-3 pr-4 text-gray-700 hover:text-purple-700"}
                >
                 {navText?.contact || "Contact"}
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;