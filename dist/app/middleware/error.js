"use strict";
// src/app/middleware/handleErrors.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, _req, res, _next) => {
    if (err.name === "ValidationError") {
        const errorDetails = {};
        for (const key in err.errors) {
            const fieldError = err.errors[key];
            errorDetails[key] = {
                message: fieldError.message,
                name: fieldError.name,
                properties: fieldError.properties,
                kind: fieldError.kind,
                path: fieldError.path,
                value: fieldError.value,
            };
        }
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: {
                name: err.name,
                errors: errorDetails,
            },
        });
        return;
    }
    // fallback error response
    res.status(err.statusCode || 500).json({
        message: err.message || "Something went wrong",
        success: false,
        error: err,
    });
};
exports.globalErrorHandler = globalErrorHandler;
