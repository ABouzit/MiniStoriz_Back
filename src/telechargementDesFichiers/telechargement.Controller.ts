import { Injectable, Post, UseInterceptors, UploadedFile, Controller } from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
@Controller('sendImage')
export class TelechargementController {
@Post('planches')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
        destination(req, file, cb) {
            cb(null, 'images/planches');
        },
        filename(req, file, cb) {
            cb(null, 'planche_' + (Math.floor(Math.random() * 90000000) + 10000000) + file.originalname.substr(file.originalname.indexOf('.'), file.originalname.lenght));
        }})}))
    uploadPlancheImg( @UploadedFile() file ) {
        console.log(file);
        return Promise.resolve({
           filePath: file.path,
        });
    }
@Post('histoires')
@UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
    destination(req, file, cb) {
        cb(null, 'images/histoires');
    },
    filename(req, file, cb) {
        cb(null, 'histoire_' + (Math.floor(Math.random() * 90000000) + 10000000) + file.originalname.substr(file.originalname.indexOf('.'), file.originalname.lenght));
    }})}))
    uploadHistoireImg( @UploadedFile() file ) {
        console.log(file);
        return Promise.resolve({
        filePath: file.path,
    });
}
@Post('photoProfile')
@UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
    destination(req, file, cb) {
        cb(null, 'images/photoProfile');
    },
    filename(req, file, cb) {
        cb(null, 'photoProfile' + (Math.floor(Math.random() * 90000000) + 10000000) + file.originalname.substr(file.originalname.indexOf('.'), file.originalname.lenght));
    }})}))
    uploadPhotoProfilImg( @UploadedFile() file ) {
        console.log(file);
        return Promise.resolve({
        filePath: file.path,
    });
}
}
