const BaseService = require("./baseService");
class LoginService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = "User";
  }
}
module.exports = LoginService;
