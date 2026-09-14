import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import { updateStudentSchema } from "../validations/studentsValidation.js";
import { getStudentsSchema } from "../validations/studentsValidation.js";
import {
  createStudent,
  deleteStudent,
  getStudents,
  getStudentById,
  updateStudent,
} from "../controllers/studentsController.js";
import { createStudentSchema } from "../validations/studentsValidation.js";
import { studentIdParamSchema } from "../validations/studentsValidation.js";


const router = Router();


router.get('/students', celebrate(getStudentsSchema), getStudents);

router.get('/students/:studentId', celebrate(studentIdParamSchema), getStudentById);

router.post('/students', celebrate(createStudentSchema), createStudent);

router.delete('/students/:studentId', celebrate(studentIdParamSchema), deleteStudent);

router.patch('/students/:studentId', celebrate(updateStudentSchema), updateStudent);


export default router;
