const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLSchema
} = require("graphql");
const joinMonster = require("join-monster");
const db = require("../db");
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
          return db.query(sql);
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
        try {
          return (
            await db.query(
              "INSERT INTO tv_shows (name, date_started, genre, time_watching, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
              [
                args.name,
                args.date_started,
                args.genre,
                args.time_watching,
                context.user.id
              ]
            )
          ).rows[0];
        } catch (err) {
          throw new Error("Failed to insert new tv show");
        }
      }
    }
  })
});

const schema = new GraphQLSchema({ query: QueryRoot, mutation: MutationRoot });

module.exports = schema;
