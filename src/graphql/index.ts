import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from '@graphql-yoga/node';

import typeDefs from './schema.gql'
import Query from './queries'
import Mutation from './mutations'

/** import custom models */

const resolvers = {
  Query,
  Mutation,
  /** custom type resolvers */
}
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

export default createServer({ schema })