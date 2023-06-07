import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { deleteTodo } from '../../businessLogic/todos'
import { getUserId } from '../utils'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId = event.pathParameters.todoId
    // TODO: Remove a TODO item by id
    console.log("Processing Event ", event);
    const userId = getUserId(event);

    await deleteTodo(userId, todoId)
  
  return {
      statusCode: 200,
      body: JSON.stringify({})
  }
}
)

handler
.use(httpErrorHandler())
.use(
  cors({
    credentials: true
  })
)