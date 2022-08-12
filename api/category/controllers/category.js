const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.category.search(ctx.query);
    } else {
      entities = await strapi.services.category.find(ctx.query);
    }
    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.category })
    );
  },
  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.category.findOne({ slug }, [
      "articles",
      "articles.author",
      "articles.image",
    ]);
    return sanitizeEntity(entity, { model: strapi.models.category });
  },
};
