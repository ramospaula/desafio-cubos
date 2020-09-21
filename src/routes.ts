import express from 'express';
import { badRequest } from './services/util/message';
import SchedulesController from './controllers/schedules';
import AttendanceRules from './controllers/attendanceRules';

const routes = express.Router();

const schedulesController = new SchedulesController();
const attendanceRules = new AttendanceRules();

routes.post('/rules', attendanceRules.saveRule);
routes.get('/rules', attendanceRules.getListRule);

routes.delete('/rules/:id', attendanceRules.deleteRule)

routes.get('/schedules', schedulesController.insertDate);

export default routes;