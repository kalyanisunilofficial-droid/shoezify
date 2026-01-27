import {createNavigation} from "next-intl/navigation";

export const locales = ["en", "it","de", "ml"] as const;

export const {Link, useRouter, usePathname} =
  createNavigation({
    locales,
  });
