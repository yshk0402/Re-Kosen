/**
 * home controller
 */

import { factories } from '@strapi/strapi';

const applyPopulate = (ctx: any) => {
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
};

export default factories.createCoreController('api::home.home', () => ({
  async find(ctx) {
    applyPopulate(ctx);

    return await super.find(ctx);
  },
  async findOne(ctx) {
    applyPopulate(ctx);

    return await super.findOne(ctx);
  },
}));
