import { HttpException, HttpStatus } from "@nestjs/common";

export class ContentDuplicateException extends HttpException {
    constructor() {
        super('Content duplicated', HttpStatus.CONFLICT);
    }   
}