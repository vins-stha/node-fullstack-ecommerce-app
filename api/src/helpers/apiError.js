"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = exports.UnauthorizedError = exports.InternalServerError = exports.ForbiddenError = exports.NotFoundError = void 0;
var ApiError = /** @class */ (function (_super) {
    __extends(ApiError, _super);
    function ApiError(statusCode, message, source) {
        var _this = _super.call(this) || this;
        _this.statusCode = statusCode;
        _this.message = message;
        _this.source = source;
        return _this;
    }
    return ApiError;
}(Error));
exports.default = ApiError;
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message, source) {
        if (message === void 0) { message = 'Not Found'; }
        var _this = _super.call(this, 404, message, source) || this;
        _this.message = message;
        return _this;
    }
    return NotFoundError;
}(ApiError));
exports.NotFoundError = NotFoundError;
var ForbiddenError = /** @class */ (function (_super) {
    __extends(ForbiddenError, _super);
    function ForbiddenError(message, source) {
        if (message === void 0) { message = 'Forbidden'; }
        var _this = _super.call(this, 403, message, source) || this;
        _this.message = message;
        return _this;
    }
    return ForbiddenError;
}(ApiError));
exports.ForbiddenError = ForbiddenError;
var InternalServerError = /** @class */ (function (_super) {
    __extends(InternalServerError, _super);
    function InternalServerError(message, source) {
        if (message === void 0) { message = 'Internal Server Error'; }
        var _this = _super.call(this, 500, message, source) || this;
        _this.message = message;
        return _this;
    }
    return InternalServerError;
}(ApiError));
exports.InternalServerError = InternalServerError;
var UnauthorizedError = /** @class */ (function (_super) {
    __extends(UnauthorizedError, _super);
    function UnauthorizedError(message, source) {
        if (message === void 0) { message = 'Unauthorized Request'; }
        var _this = _super.call(this, 401, message, source) || this;
        _this.message = message;
        return _this;
    }
    return UnauthorizedError;
}(ApiError));
exports.UnauthorizedError = UnauthorizedError;
var BadRequestError = /** @class */ (function (_super) {
    __extends(BadRequestError, _super);
    function BadRequestError(message, source) {
        if (message === void 0) { message = 'Bad Request'; }
        var _this = _super.call(this, 400, message, source) || this;
        _this.message = message;
        return _this;
    }
    return BadRequestError;
}(ApiError));
exports.BadRequestError = BadRequestError;
