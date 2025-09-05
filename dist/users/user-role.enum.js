"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoleEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum["ADMIN"] = "ADMIN";
    UserRoleEnum["GALLERY"] = "GALLERY";
    UserRoleEnum["USER"] = "USER";
    UserRoleEnum["ARTIST"] = "ARTIST";
})(UserRoleEnum || (exports.UserRoleEnum = UserRoleEnum = {}));
(0, graphql_1.registerEnumType)(UserRoleEnum, { name: 'UserRole' });
//# sourceMappingURL=user-role.enum.js.map