import { StatusCode } from './statusCodes';
export default class ApiError extends Error {
    status: number

    constructor(status: number, message: string) {
        super()
        Object.setPrototypeOf(this, new.target.prototype);
        this.status = status
        this.message = message
    }

    static badRequest(message: string) {
        return new ApiError(StatusCode.BAD_REQUEST, message)
    }

    static unauthorized(message: string) {
        return new ApiError(StatusCode.UNAUTHORIZED, message)
    }

    static accessForbidden(message: string) {
        return new ApiError(StatusCode.FORBIDDEN, message)
    }

    static notFound(message: string) {
        return new ApiError(StatusCode.NOT_FOUND, message)
    }

    static serverError(message: string) {
        return new ApiError(StatusCode.INTERNAL_SERVER_ERROR, message)
    }
}