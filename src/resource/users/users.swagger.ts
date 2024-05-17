import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const createUserSwagger = {
  operation: ApiOperation({
    summary: 'Create user',
    description:
      'This endpoint creates a new user with the given data in the request body and returns the created user',
  }),
  createdResponse: ApiCreatedResponse({
    description: 'User created successfully',
  }),
  badRequestResponse: ApiBadRequestResponse({
    description: 'Request body is invalid or missing required fields',
  }),
  forbiddenResponse: ApiForbiddenResponse({ description: 'Forbidden' }),
  internalServerErrorResponse: ApiInternalServerErrorResponse({
    description: 'Internal server error when creating user',
  }),
};

export const findAllUsersSwagger = {
  operation: ApiOperation({
    summary: 'Get all users',
    description: 'This endpoint returns all users in the database',
  }),
  okResponse: ApiOkResponse({ description: 'Return all users' }),
  notFoundResponse: ApiNotFoundResponse({
    description: 'No users found in the database',
  }),
  internalServerErrorResponse: ApiInternalServerErrorResponse({
    description: 'Internal server error when fetching users',
  }),
};

export const deleteUserSwagger = {
  operation: ApiOperation({
    summary: 'Delete user',
    description: 'This endpoint deletes a user by id',
  }),
  okResponse: ApiOkResponse({ description: 'User deleted successfully' }),
  notFoundResponse: ApiNotFoundResponse({ description: 'User not found' }),
  internalServerErrorResponse: ApiInternalServerErrorResponse({
    description: 'Internal server error when deleting user',
  }),
};
