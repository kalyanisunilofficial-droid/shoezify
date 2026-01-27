// import {defineConfig} from 'sanity'
// import {structureTool} from 'sanity/structure'
// import {visionTool} from '@sanity/vision'
// import {schemaTypes} from './schemaTypes'
// import { TranslateAction } from './plugins/translateActions'

// export default defineConfig({
//   name: 'default',
//   title: 'my-sanity-app',

//   projectId: '0bpyjv6o',
//   dataset: 'production',

//   plugins: [structureTool(), visionTool()
    
//   ],

//   schema: {
//     types: schemaTypes,
//   },
//   document: {
//     actions: (prev, context) =>
//       context.schemaType === "product"
//         ? [...prev, TranslateAction]
//         : prev,
//   },
// })


import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";

import { schemaTypes } from "./schemaTypes";
import { TranslateAction } from "./plugins/translateActions";

export default defineConfig({
  name: "default",
  title: "my-sanity-app",

  projectId: "0bpyjv6o",
  dataset: "production",

  plugins: [
    structureTool(),
    visionTool(),

    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "hi", title: "Hindi" },
        { id: "fr", title: "French" },
      ],
      // 👇 add all schema types you want translated
      schemaTypes: [ "product"],
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) =>
      context.schemaType === "product"
        ? [...prev, TranslateAction]
        : prev,
  },
});

