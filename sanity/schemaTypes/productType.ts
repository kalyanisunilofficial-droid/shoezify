import { defineType, defineField } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",

  fields: [
    // 🌍 LANGUAGE SELECTOR
    defineField({
      name: "activeLanguage",
      title: "Editing Language",
      type: "string",
      initialValue: "en_IN",
      options: {
        list: [
          { title: "English (India)", value: "en_IN" },
          { title: "English (Germany)", value: "en_DE" },
          { title: "Malayalam", value: "ml" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),

    // 🔤 TRANSLATIONS
    defineField({
      name: "translations",
      title: "Translations",
      type: "object",
      fields: [
       
        defineField({
          name: "en_IN",
          title: "English (India)",
          type: "object",
          hidden: ({ document }) =>
            document?.activeLanguage !== "en_IN",
          fields: [
            defineField({
              name: "name",
              title: "Product Name",
              type: "string",
            }),
            defineField({
              name: "desc",
              title: "Description",
              type: "text",
            }),
          ],
        }),

       
        defineField({
          name: "en_DE",
          title: "English (Germany)",
          type: "object",
          hidden: ({ document }) =>
            document?.activeLanguage !== "en_DE",
          fields: [
            defineField({
              name: "name",
              title: "Product Name",
              type: "string",
            }),
            defineField({
              name: "desc",
              title: "Description",
              type: "text",
            }),
          ],
        }),

      
        defineField({
          name: "ml",
          title: "Malayalam",
          type: "object",
          hidden: ({ document }) =>
            document?.activeLanguage !== "ml",
          fields: [
            defineField({
              name: "name",
              title: "Product Name",
              type: "string",
            }),
            defineField({
              name: "desc",
              title: "Description",
              type: "text",
            }),
          ],
        }),
      ],
    }),

  
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "img",
      title: "Product Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],


  preview: {
    select: {
      activeLanguage: "activeLanguage",
      translations: "translations",
      media: "img",
    },
    prepare({ activeLanguage, translations, media }) {
      return {
        title:
          translations?.[activeLanguage]?.name ||
          "Untitled Product",
        subtitle: `Editing: ${activeLanguage}`,
        media,
      };
    },
  },
});
