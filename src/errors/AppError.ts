class AppError extends Error {
    status
    constructor(message: string, status: number) {
        super()
        this.message = message
        this.status = status
    }
}

export {
    AppError
}