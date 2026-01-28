import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "activeLanguage",
      title: "Editing Language",
      type: "string",
      initialValue: "en_IN",
      options: {
        list: [
          { title: "English (India)", value: "en_IN" },
          { title: "Malayalam", value: "ml" },
        ],
      },
    }),

    defineField({
      name: "navbar",
      title: "Navbar Labels",
      type: "object",
      fields: [
        // Fields for English (India)
        defineField({
          name: "en_IN",
          type: "object",
          hidden: ({ document }) => document?.activeLanguage !== "en_IN",
          fields: [
            { name: "home", type: "string", title: "Home Label" },
            { name: "about", type: "string", title: "About Label" },
            { name: "contact", type: "string", title: "Contact Label" },
             { name: "team", type: "string", title: "Team Label" },
            { name: "login", type: "string", title: "Login Label" },
          ],
        }),
        // Fields for Malayalam
        defineField({
          name: "ml",
          type: "object",
          hidden: ({ document }) => document?.activeLanguage !== "ml",
          fields: [
            { name: "home", type: "string", title: "Home Label" },
            { name: "about", type: "string", title: "About Label" },
            { name: "contact", type: "string", title: "Contact Label" },
               { name: "team", type: "string", title: "Team Label" },
              { name: "login", type: "string", title: "Login Label" },
          ],
        }),
      ],
    }),

     defineField({
      name: "footer",
      title: "Footer Labels",
      type: "object",
      fields: [
        // Fields for English (India)
        defineField({
          name: "en_IN",
          type: "object",
          hidden: ({ document }) => document?.activeLanguage !== "en_IN",
          fields: [
            { name: "home", type: "string", title: "Home Label" },
            { name: "about", type: "string", title: "About Label" },
            { name: "contact", type: "string", title: "Contact Label" },
            
            { name: "copyright", type: "string", title: "Copyright Label" },
          ],
        }),
        // Fields for Malayalam
        defineField({
          name: "ml",
          type: "object",
          hidden: ({ document }) => document?.activeLanguage !== "ml",
          fields: [
            { name: "home", type: "string", title: "Home Label" },
            { name: "about", type: "string", title: "About Label" },
            { name: "contact", type: "string", title: "Contact Label" },
              { name: "copyright", type: "string", title: "Copyright Label" },
          ],
        }),
      ],
    }),

  ],
});