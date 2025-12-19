import { BadRequestError } from '../errors/bad-request';
import { NotFoundError } from '../errors/not-found';
import { ServerError } from '../errors/server-error';

export type HttpResponse<T = any> = {
  statusCode: number;
  data: T;
};

export const successfuRequest = <T = any>(data: T): HttpResponse<T> => ({
  statusCode: 200,
  data,
});

export const badRequest = (error: Error): HttpResponse<Error> => ({
  statusCode: 400,
  data: new BadRequestError(error.message),
});

export const notFound = (error: Error): HttpResponse<Error> => ({
  statusCode: 404,
  data: new NotFoundError(error.message),
});

export const serverError = (error: unknown): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error instanceof Error ? error : undefined),
});
