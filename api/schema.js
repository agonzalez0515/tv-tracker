const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLSchema
} = require("graphql");
const joinMonster = require("join-monster");
const knex = require("../db/knex");
const { User, TvShow } = require("./typeDefs");

const QueryRoot = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    user: {
      type: User,
      args: { email: { type: GraphQLNonNull(GraphQLString) } },
      where: (usersTable, args, context) => {
        return `${usersTable}.email = '${args.email}'`;
      },
      resolve: async (parent, args, context, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return knex.raw(sql);
        });
      }
    }
  })
});

const MutationRoot = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    newTvShow: {
      type: TvShow,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        date_started: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        time_watching: { type: GraphQLNonNull(GraphQLString) }
      },
      resolve: async (parent, args, context, resolveInfo) => {
        return knex("tv_shows")
          .returning("*")
          .insert({
            name: args.name,
            date_started: args.date_started,
            genre: args.genre,
            time_watching: args.time_watching,
            user_id: context.user.id
          })
          .then(rows => rows[0])
          .catch(err => console.log(err));
      }
    }
  })
});

const schema = new GraphQLSchema({ query: QueryRoot, mutation: MutationRoot });

module.exports = schema;
