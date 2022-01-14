import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

const DateTimeType = new GraphQLScalarType<Date, string>({
  description: 'DateTime custom scalar type',
  name: 'DateTime',
  parseLiteral: (ast) => {
    if (ast.kind === Kind.STRING) { return new Date(ast.value) }
    else { throw new Error('DateTime cannot represent value: ' + ast) }
  },
  parseValue: (value) => {
    if (typeof value === 'string') { return new Date(value) }
    else { throw new TypeError('DateTime cannot represent value: ' + value) }
  },
  serialize: (value) => {
    if (value instanceof Date) { return value.toISOString() }
    else { throw new TypeError('DateTime cannot represent value: ' + value) }
  }
})

export { DateTimeType }
