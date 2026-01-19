/**
 * home controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::home.home', () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        pickupMediums: {
          populate: {
            coverImage: true,
          },
        },
        popularItems: {
          populate: {
            coverImage: true,
          },
        },
        featuredItems: {
          populate: {
            coverImage: true,
          },
        },
        banners: {
          populate: {
            desktopImage: true,
            mobileImage: true,
          },
        },
        lineCta: true,
      },
    };

    // @ts-expect-error Strapi controller typing does not include super
    return await super.find(ctx);
  },
}));
