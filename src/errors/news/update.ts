export class UpdateNewsServerError extends Error {
  constructor() {
    super('It was not possible to update the news.');
    this.name = 'UpdateNewsError';
    Object.setPrototypeOf(this, UpdateNewsServerError.prototype);
  }
}

export class NewsNotFoundToUpdateError extends Error {
  constructor() {
    super('It was not possible to find the news to update.');
    this.name = 'NewsNotFoundToUpdateError';
    Object.setPrototypeOf(this, NewsNotFoundToUpdateError.prototype);
  }
}
