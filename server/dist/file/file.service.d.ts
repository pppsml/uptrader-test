/// <reference types="multer" />
import { Model } from 'mongoose';
import { File } from './file.schema';
export declare class FileService {
    private fileModel;
    constructor(fileModel: Model<File>);
    create(file: Express.Multer.File): Promise<File>;
}
