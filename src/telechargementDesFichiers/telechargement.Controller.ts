import { Injectable, Post, UseInterceptors, UploadedFile, Controller } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Controller('images')
export class TelechargementController {
@Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
        destination(req, file, cb) {
            cb(null, 'images');
        },
        filename(req, file, cb) {
            cb(null, file.originalname);
        }})})) 
uploadFile( @UploadedFile() file ) {
    console.log(file);
}
}
