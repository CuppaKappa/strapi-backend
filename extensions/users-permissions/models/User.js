'use strict';
module.exports = {
    lifecycles: {
        async afterCreate(data) {
            console.log('afterCreate', data);

            const cart = await strapi.services.cart.create({
                user: data
            });

            console.log('cart', await cart);
            console.log('did the cart show?');

            return await strapi.services.user.update(
                { id: data.id },
                { ...data, cart: cart.id }
            );
        }
    }
};
