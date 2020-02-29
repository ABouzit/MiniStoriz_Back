import { Injectable, Post, UseInterceptors, UploadedFile, Controller } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Controller('images')
export class TelechargementController {
@Post('planches')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
        destination(req, file, cb) {
            cb(null, 'images/planches');
        },
        filename(req, file, cb) {
            cb(null, file.originalname);
        }})})) 
    uploadPlancheImg( @UploadedFile() file ) {
        console.log(file);
    }
@Post('histoires')
@UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
    destination(req, file, cb) {
        cb(null, 'images/histoires');
    },
    filename(req, file, cb) {
        cb(null, file.originalname);
    }})})) 
    uploadHistoireImg( @UploadedFile() file ) {
    console.log(file);
}
}
