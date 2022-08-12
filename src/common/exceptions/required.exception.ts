import { HttpException, HttpStatus } from "@nestjs/common";

export class RequiredException extends HttpException {
    constructor() {
        super('No content', HttpStatus.INTERNAL_SERVER_ERROR);
    }   
}