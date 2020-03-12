const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

const TvShow = new GraphQLObjectType({
  name: "TvShow",
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    date_started: { type: GraphQLString },
    date_finished: { type: GraphQLString },
    genre: { type: GraphQLString },
    time_spent: { type: GraphQLString }
  })
});

TvShow._typeConfig = {
  sqlTable: "tv_shows",
  uniqueKey: "id"
};

module.exports = TvShow;
