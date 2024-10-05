const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case 400:
            return res.status(400).json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack,
            });
        case 404:
            return res.status(404).json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
        default:
            console.error(err); // Log the error for debugging
            return res.status(statusCode).json({
                title: "Internal Server Error",
                message: "An unexpected error occurred.",
                stackTrace: err.stack,
            });
    }
};

module.exports = errorHandler;