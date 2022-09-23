import { Request, Response } from 'express';

export class SuccessResponse {
  data!: Record<string, unknown>;
  message!: string;
  status!: number;

  constructor(data: Record<string, unknown>, message: string = '', status: number = 200) {
    this.data = data;
    this.message = message;
    this.status = status;
  }
}

export class ErrorResponse {
  message!: string;
  status!: number;

  constructor(message: string, status: number = 500) {
    this.message = message;
    this.status = status;
  }
}
