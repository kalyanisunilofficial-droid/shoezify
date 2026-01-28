"use client";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function Footer({ footerText }: { footerText?: any }) {
  const params = useParams();
  const locale = params.locale as string;

  return (
    <footer className="flex flex-col space-y-10 justify-center m-10">
      <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
       
        <Link className="hover:text-gray-900" href={`/${locale}`}>
          {footerText?.home || "Home"}
        </Link>
        <Link className="hover:text-gray-900" href={`/${locale}/about`}>
          {footerText?.about || "About"}
        </Link>
        <Link className="hover:text-gray-900" href={`/${locale}/contact`}>
          {footerText?.contact || "Contact"}
        </Link>
      </nav>

      <div className="flex justify-center space-x-5">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" alt="Facebook" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" alt="LinkedIn" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" alt="Instagram" />
        </a>
      </div>

      <p className="text-center text-gray-700 font-medium">
        &copy; 2026 {footerText?.copyright || "Shoezify Company Ltd. All rights reserved."}
      </p>
    </footer>
  );
}