export class DeleteNewsServerError extends Error {
  constructor() {
    super('It was not possible to delete the news.');
    this.name = 'DeleteNewsServerError';
  }
}

export class NewsNotFoundToDeleteError extends Error {
  constructor() {
    super('It was not possible to find the news to delete.');
    this.name = 'NewsNotFoundToDeleteError';
    Object.setPrototypeOf(this, NewsNotFoundToDeleteError.prototype);
  }
}
