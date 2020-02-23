import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as firebase from 'firebase/app';
import * as admin from 'firebase-admin';
import 'firebase/auth';
import 'firebase/firestore';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const firebaseConfig = {
     apiKey: 'AIzaSyAMxYL804MZ93kG1Frc-rl0x1w9KHpAijE',
     authDomain: 'ministoriz.firebaseapp.com',
     databaseURL: 'https://ministoriz.firebaseio.com',
     projectId: 'ministoriz',
     storageBucket: 'ministoriz.appspot.com',
     messagingSenderId: '1009627651324',
     appId: '1:1009627651324:web:c4f2d077e9b78b0a4a8b79',
     measurementId: 'G-GCE7W0GMFW',
   };
  firebase.initializeApp(firebaseConfig);
  admin.initializeApp({
     credential: admin.credential.applicationDefault(),
     databaseURL: 'https://ministorizdb.firebaseio.com',
   });
  await app.listen(5600);

}
bootstrap();
