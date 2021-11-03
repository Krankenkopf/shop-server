export default class ApiError extends Error {
    status: number

    constructor(status: number, message: string) {
        super()
        Object.setPrototypeOf(this, new.target.prototype);
        this.status = status
        this.message = message
    }

    static badRequest(message: string) {
        return new ApiError(400, message)
    }

    static unauthorized(message: string) {
        return new ApiError(401, message)
    }

    static accessForbidden(message: string) {
        return new ApiError(403, message)
    }

    static notFound(message: string) {
        return new ApiError(404, message)
    }

    static serverError(message: string) {
        return new ApiError(500, message)
    }
}