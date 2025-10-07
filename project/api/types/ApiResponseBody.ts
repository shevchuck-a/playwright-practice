export type ApiResponseBody<T = unknown> = {
  responseCode: number;
} & T;