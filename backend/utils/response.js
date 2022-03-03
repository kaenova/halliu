class Response {
  constructor(status, data, message) {
    this.status = status;
    this.data = data;
    this.message = message;
  }

  getData() {
    return {
      status: this.status,
      data: this.data,
      message: this.message,
    };
  }
}

export { Response };
