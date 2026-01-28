"use client";

import { usePathname, useRouter } from "next/navigation";

const languages = [
  { code: "en", name: "English" },
  { code: "ml", name: "Malayalam" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return;

    // Use Regex to find the first segment (the locale) and replace it
    // This looks for "/en" or "/ml" at the very start of the string
    
    const newPath = pathname.replace(/^\/(en|ml)/, `/${newLocale}`);

    console.log("Navigating to:", newPath);
    console.log("From locale to locale:", newLocale);

    //
    // We use router.refresh() after push OR use window.location for a hard swap.
    router.push(newPath);
    
 
  
  };

 
  const currentLocale = pathname.split("/")[1] || "en";

  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-full border border-gray-200">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => handleLanguageChange(lang.code)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
            currentLocale === lang.code
              ? "bg-black text-white shadow-sm"
              : "text-gray-500 hover:text-black hover:bg-gray-200"
          }`}
        >
          {lang.code}
        </button>
      ))}
    </div>
  );
}