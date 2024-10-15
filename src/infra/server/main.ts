import "./config/module-alias";
import "./config/env";
import { Registry } from "@/infra/di/di";
import { MongooseAdapter } from "@/infra/database/mongoose-adapter";
import { ExpressAdapter } from "@/infra/http/express-adapter";
import { Logger } from "@/infra/logger";
import { setupRoutes } from "@/infra/server/config/routes";
import env from "@/infra/server/config/env";
import SetupMiddlewares from "@/infra/server/config/middlewares";
import ODM from "@/infra/odm/odm";

function main() {
  const httpServer = new ExpressAdapter();
  const mongodb = new MongooseAdapter(env.mongoUrl);
  Registry.getInstance().provide("logger", Logger);
  Registry.getInstance().provide("httpServer", httpServer);
  Registry.getInstance().provide("databaseConnection", mongodb);
  Registry.getInstance().provide("odm", new ODM(mongodb));
  new SetupMiddlewares();
  setupRoutes();
  httpServer.listen(env.port);
}

main();
