import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import {
  getStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../controllers/studentsController.js";
import {
  createStudentSchema,
  getStudentsSchema,
  studentIdParamSchema,
  updateStudentSchema
} from "../validations/studentsValidation.js";
import { authenticate } from "../middlware/authenticate.js";


const router = Router();

router.use('/students', authenticate);

router.get('/students', celebrate(getStudentsSchema), getStudents);

router.get('/students/:studentId', celebrate(studentIdParamSchema), getStudentById);

router.post('/students', celebrate(createStudentSchema), createStudent);

router.delete('/students/:studentId', celebrate(studentIdParamSchema), deleteStudent);

router.patch('/students/:studentId', celebrate(updateStudentSchema), updateStudent);


export default router;
