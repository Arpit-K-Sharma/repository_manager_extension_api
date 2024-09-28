const successResponse = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

const errorResponse = (res, statusCode, message, error) => {
    return res.status(statusCode).json({
        success: false,
        message,
        error: error?.message || error, // Error message or the full error object
    });
};

export { successResponse, errorResponse };
