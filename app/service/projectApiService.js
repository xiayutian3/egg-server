const BaseService = require("./baseService");
class ProjectApiService extends BaseService {
  constructor(...args) {
    super(...args);
    this.entity = "ProjectApi";
  }
}
module.exports = ProjectApiService;
