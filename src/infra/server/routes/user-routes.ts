import { inject } from "@/infra/di/di";
import HttpServer from "@/infra/http/http-server";
import { adaptRoute } from "@/infra/server/adapters";
import { makeCreateUserController } from "@/infra/server/factories/controllers/create-user-controller";
import { makeGetUserController } from "@/infra/server/factories/controllers/get-user-controller";
import { makeDeleteUserController } from "@/infra/server/factories/controllers/delete-user-controller";
import { makePutUserController } from "@/infra/server/factories/controllers/put-user-controller";

export default class UserController {
  @inject("httpServer")
  httpServer?: HttpServer;

  constructor() {
    this.httpServer?.register(
      "get",
      "/users/:id",
      adaptRoute(makeGetUserController())
    );
    this.httpServer?.register(
      "delete",
      "/users/:id",
      adaptRoute(makeDeleteUserController())
    );
    this.httpServer?.register(
      "put",
      "/users/:id",
      adaptRoute(makePutUserController())
    );
    this.httpServer?.register(
      "post",
      "/users",
      adaptRoute(makeCreateUserController())
    );
  }
}
