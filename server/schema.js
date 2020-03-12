const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLSchema
} = require("graphql");
const joinMonster = require("join-monster");
const db = require("./db");
const { isTokenValid } = require("./utils/withAuth");
const { User } = require("./typeDefs");

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
        const token = context.cookies.telly_tracker;
        const { error } = await isTokenValid(token);

        if (error) {
          throw new Error(error);
        }

        return joinMonster.default(resolveInfo, {}, sql => {
          return db.query(sql);
        });
      }
    }
  })
});

const schema = new GraphQLSchema({ query: QueryRoot });

module.exports = schema;
