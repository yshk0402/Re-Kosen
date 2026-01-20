export default ({ env }: { env: any }) => {
  const resolveCspSource = (value?: string) => {
    if (!value) {
      return null;
    }

    try {
      return new URL(value).origin;
    } catch {
      return value;
    }
  };

  const uploadSource = resolveCspSource(
    env("S3_BASE_URL") || env("S3_ENDPOINT"),
  );
  const mediaSources = ["'self'", "data:", "blob:", "market-assets.strapi.io"];

  if (uploadSource) {
    mediaSources.push(uploadSource);
  }

  return [
    "strapi::logger",
    "strapi::errors",
    {
      name: "strapi::security",
      config: {
        contentSecurityPolicy: {
          useDefaults: true,
          directives: {
            "connect-src": ["'self'", "https:"],
            "img-src": mediaSources,
            "media-src": mediaSources,
            upgradeInsecureRequests: null,
          },
        },
      },
    },
    "strapi::cors",
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
  ];
};
