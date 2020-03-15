const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require("graphql");
const TvShow = require("./tvShowsType");

const User = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLInt },
    email: { type: GraphQLString },
    tv_shows: {
      type: new GraphQLList(TvShow),
      sqlJoin: (userTable, tvShowTable, args) =>
        `${userTable}.id = ${tvShowTable}.user_id`
    }
  })
});

User._typeConfig = {
  sqlTable: "users",
  uniqueKey: "id"
};

module.exports = User;
