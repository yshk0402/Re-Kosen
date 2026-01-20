export default ({ env }: { env: any }) => {
  const isS3Configured = Boolean(
    env("S3_BUCKET") &&
      env("S3_ACCESS_KEY_ID") &&
      env("S3_ACCESS_KEY_SECRET") &&
      env("S3_ENDPOINT"),
  );

  if (!isS3Configured) {
    return {};
  }

  return {
    upload: {
      config: {
        provider: "aws-s3",
        providerOptions: {
          baseUrl: env("S3_BASE_URL"),
          s3Options: {
            credentials: {
              accessKeyId: env("S3_ACCESS_KEY_ID"),
              secretAccessKey: env("S3_ACCESS_KEY_SECRET"),
            },
            region: env("S3_REGION"),
            endpoint: env("S3_ENDPOINT"),
            forcePathStyle: env("S3_FORCE_PATH_STYLE", "true") === "true",
            params: {
              ACL: env("S3_ACL", "public-read"),
              signedUrlExpires: env.int("S3_SIGNED_URL_EXPIRES", 15 * 60),
              Bucket: env("S3_BUCKET"),
            },
          },
        },
        actionOptions: {
          upload: {},
          uploadStream: {},
          delete: {},
        },
      },
    },
  };
};
