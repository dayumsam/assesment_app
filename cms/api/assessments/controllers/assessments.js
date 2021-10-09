const { sanitizeEntity } = require('strapi-utils');

module.exports = {
  async find(ctx) {
    let entities;

    if (ctx.query._q) {
      entities = await strapi.services.assessments.search(ctx.query);
    } else {
      entities = await strapi.services.assessments.find(ctx.query);
    }

    return entities.map(entity => {
      const assessments = sanitizeEntity(entity, {
        model: strapi.models.assessments,
      });

      if (assessments.created_by) {
        delete assessments.created_by;
      }
      if (assessments.published_at) {
        delete assessments.published_at;
      }
      if (assessments.updated_by) {
        delete assessments.updated_by;
      }
      if (assessments.created_at) {
        delete assessments.created_at;
      }
      if (assessments.updated_at) {
        delete assessments.updated_at;
      }
      if (assessments.submissions) {
        delete assessments.submissions;
      }
      if (assessments.schools) {
        delete assessments.schools;
      }
      if (assessments.classes) {
        delete assessments.classes;
      }

      return assessments;
    });
  },
};
 