import { CreateUser } from "@/application/usecases";
import {
  HttpRequest,
  HttpResponse,
  response,
} from "@/interfaces/presentations";
import { Controller } from "./controller";
import { Logger } from "@/infra/logger";
import { AJVCompile as InputValidator } from "@/infra/input-validator";
import { requestInputSchema } from "./schema/create-user";
import { inject } from "@/infra/di/di";
import CustomError from "@/domain/entity/error";

export class CreateUserController implements Controller {
  @inject("createUser")
  usecase!: CreateUser;

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const inputValidator = new InputValidator();
      const resultValidator = await inputValidator.compile(
        requestInputSchema,
        body
      );
      if (!resultValidator.isValid) {
        Logger.ERROR(`Input Schema Error: ${resultValidator.message}`);
        return response({ error: resultValidator.message }, 400);
      }
      const { error, value } = await this.usecase.execute(body);
      if (error && !value) {
        Logger.ERROR(`Business Rule Error: ${JSON.stringify(error)}`);
        return response({ error }, error.status || 400);
      }
      return response({ value }, 201);
    } catch (error: any) {
      if (error instanceof CustomError) {
        Logger.ERROR(String(error.code), error.message);
        return response(
          {
            error: {
              code: error.code,
              title: error.title,
              status: error.statusCode,
              detail: error.message || "No mapped error",
            },
          },
          error.statusCode
        );
      }
      Logger.ERROR(`Server Error: ${JSON.stringify(error.message)}`);
      return response(
        {
          error: {
            code: "UNPROCESSABLE_ENTITY",
            title: "Unprocessable Entity",
            status: 422,
            detail: JSON.stringify(error.message || "No mapped error"),
          },
        },
        422
      );
    }
  }
}
