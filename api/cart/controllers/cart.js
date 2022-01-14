const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    // async find(ctx) {
    //     let entities;

    //     if (ctx.query._q) {
    //         entities = await strapi.services.cart.search(ctx.query);
    //     } else {
    //         entities = await strapi.services.cart.find(ctx.query);
    //     }

    //     return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.cart }));
    // },
    async find(ctx) {
        // console.log({ cart: ctx.state.user.cart });

        if (!ctx.state.user.cart) {
            const newCart = await strapi.services.cart.create({
                user: ctx.state.user.id,
            });
        }

        const entity = await strapi.services.cart.findOne({ id: ctx.state.user.cart });

        if (!entity) {
            return {};
        }

        return sanitizeEntity(entity, { model: strapi.models.cart });
    },
    async create(ctx) {
        const entity = await strapi.services.cart.create(ctx.request.body);

        return sanitizeEntity(entity, { model: strapi.models.cart });
    },
    async update(ctx) {
        const entity = await strapi.services.restaurant.update({ id: ctx.state.user.cart.id }, ctx.request.body);

        return sanitizeEntity(entity, { model: strapi.models.restaurant });
    },
};
