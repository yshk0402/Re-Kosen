export default ({ env }: { env: any }) => {
  const previewBaseUrl = env('PREVIEW_URL', 'http://localhost:3000');
  const previewSecret = env('PREVIEW_SECRET');
  let previewOrigin: string | undefined;

  try {
    previewOrigin = previewBaseUrl ? new URL(previewBaseUrl).origin : undefined;
  } catch {
    previewOrigin = undefined;
  }

  return {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
      salt: env('API_TOKEN_SALT'),
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT'),
      },
    },
    secrets: {
      encryptionKey: env('ENCRYPTION_KEY'),
    },
    preview: {
      enabled: Boolean(previewSecret && previewOrigin),
      config: {
        allowedOrigins: previewOrigin ? [previewOrigin] : undefined,
        handler: async (uid: string, { documentId }: { documentId?: string }) => {
          if (!previewSecret || !previewBaseUrl) {
            return undefined;
          }
          if (uid !== 'api::article.article') {
            return undefined;
          }
          if (!documentId) {
            return undefined;
          }

          const entry = await strapi.db.query(uid).findOne({
            where: { documentId },
            select: ['slug'],
          });
          const slug = entry?.slug;

          if (!slug || typeof slug !== 'string') {
            return undefined;
          }

          const previewUrl = new URL('/api/preview', previewBaseUrl);
          previewUrl.searchParams.set('secret', previewSecret);
          previewUrl.searchParams.set('slug', slug);
          return previewUrl.toString();
        },
      },
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
  };
};
