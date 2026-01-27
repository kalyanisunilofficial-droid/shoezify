import { defineField, defineType } from "sanity";

export const hero = defineType({
  name: "hero",
  title: "Hero Section",
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
      name: "heroContent",
      title: "Localized Content",
      type: "object",
      fields: [
     
        defineField({
          name: "en_IN",
          title: "English (India)",
          type: "object",
          hidden: ({ document }) => document?.activeLanguage !== "en_IN",
          fields: [
            { name: "title", type: "string", title: "Hero Title" },
            { name: "img", type: "image", title: "Hero Image", options: { hotspot: true } },
          ],
        }),

        defineField({
          name: "ml",
          title: "Malayalam",
          type: "object",
          hidden: ({ document }) => document?.activeLanguage !== "ml",
          fields: [
            { name: "title", type: "string", title: "Hero Title" },
            { name: "img", type: "image", title: "Hero Image", options: { hotspot: true } },
          ],
        }),
      ],
    }),
  ],
});