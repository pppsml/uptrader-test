import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { File, FileDocument } from './file.schema';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<File>) {}

  async create(file: Express.Multer.File): Promise<File> {
    try {
      const fileUri = `${process.env.BACKEND_URI}/${file.path}`
  
      const createdFile = await this.fileModel.create({
        uri: fileUri,
        filename: file.originalname,
      })
  
      return createdFile
    } catch (error) {
      throw new InternalServerErrorException('error occurent while file uploading')
    }
  }
}