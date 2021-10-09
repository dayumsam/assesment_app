const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  async create(ctx) {

    let data = ctx.request.body

    let assessment = await strapi
    .query('assessments')
    .findOne({ id: data.test_id })

    let submission = {
        "users_permissions_user": ctx.state.user,
        "question": []
    }

    console.log(assessment["questions"]);
    for(let i = 0; i < assessment["questions"].length; i++){

        let answer

        for(let j = 0; j < assessment["questions"][i]["answer"].length; j++){
            if(assessment["questions"][i]["answer"][j].id == data[assessment["questions"][i]["question"]["id"]]){
                answer = assessment["questions"][i]["answer"][j].answer_option
            }
        }

        let question = {
            "Question": {
                "question": assessment["questions"][i]["question"]["question"],
                "description": assessment["questions"][i]["question"]["description"]
            },
            "answer": {
                "answer": answer,
            }
        }

        submission.question.push(question)
    }

    console.log(submission.question[0].answer);

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.submission.create(data, { files });
    } else {
      entity = await strapi.services.submission.create(submission);
    }
    return sanitizeEntity(entity, { model: strapi.models.submission });
  },
  async check(ctx){
    return strapi.query('submission').find({users_permissions_user: ctx.state.user.id});
  },
  async count(ctx){
    return strapi.query('submission').count({users_permissions_user: ctx.state.user.id});
  }
};
