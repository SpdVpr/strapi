export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  {
    name: 'strapi::body',
    config: {
      formLimit: '256mb', // Limit for the form body
      jsonLimit: '256mb', // Limit for the JSON body
      textLimit: '256mb', // Limit for the text body
      formidable: {
        maxFileSize: 200 * 1024 * 1024, // 200MB in bytes
      },
    },
  },
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
