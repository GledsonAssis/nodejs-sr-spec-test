import { MongooseAdapter } from "@/infra/database/mongoose-adapter";
import { Model as OdmModel } from "@/infra/odm/models/model";
import { Model } from "mongoose";
export default class ODM {
  constructor(readonly connection: MongooseAdapter) {}

  async save<T>(props: OdmModel, obj: Object) {
    const ModelClass: Model<T> = this.connection.connection!.model<T>(
      props.collection,
      props.schema
    );
    if (!ModelClass) {
      throw new Error("ModelClass error: " + props.collection);
    }
    return ModelClass.create(obj);
  }

  async findOne<T = any>(props: OdmModel, id: string) {
    const ModelClass: Model<T> = this.connection.connection!.model<T>(
      props.collection,
      props.schema
    );
    if (!ModelClass) {
      throw new Error("ModelClass error: " + props.collection);
    }
    return ModelClass.findById(id);
  }

  async deleteOne<T = any>(props: OdmModel, id: string) {
    const ModelClass: Model<T> = this.connection.connection!.model<T>(
      props.collection,
      props.schema
    );
    if (!ModelClass) {
      throw new Error("ModelClass error: " + props.collection);
    }
    return ModelClass.findByIdAndDelete(id);
  }
  async updateOne<T = any>(props: OdmModel, id: string, document: Object) {
    const ModelClass: Model<T> = this.connection.connection!.model<T>(
      props.collection,
      props.schema
    );
    if (!ModelClass) {
      throw new Error("ModelClass error: " + props.collection);
    }
    return ModelClass.findByIdAndUpdate(id, document, { new: true });
  }
}
