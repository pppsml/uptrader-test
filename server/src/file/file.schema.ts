import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, ObjectId } from "mongoose";


@Schema({ timestamps: { createdAt: true, updatedAt: false },  })
export class File {
  _id: ObjectId;
  
  @Prop({ required: true, })
  filename: string;

  @Prop({ required: true, })
  uri: string;
}

export type FileDocument = HydratedDocument<File>;
export const FileSchema = SchemaFactory.createForClass(File)