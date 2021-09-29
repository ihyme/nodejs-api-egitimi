"use strict"
import createError from 'http-errors';
import express, { json, urlencoded, static as st } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import movieRouter from './routes/movie.js';
import directorRouter from './routes/director.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
import config from "./helper/config.js"
import verifytoken from "./middleware/verifytoken.js"

 
// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set("secretKey",config.secretKey)
app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(st(join(__dirname, 'public')));
app.use('/api',verifytoken);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/movies', movieRouter);
app.use('/api/directors',directorRouter);

// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(401).json({status:false,message:err.message});
  
});

export default app;