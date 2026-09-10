import { json } from "express";
import { Student } from "../models/student.js";
import createHttpError from 'http-errors';

export const getStudents = async (req, res) => {
  const students = await Student.find();
  res.status(200).json(students);
};

export const getStudentById = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);

   if (!student) {
	  throw new createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};

export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

export const deleteStudent = async(req, res) => {
  const {studentId} = req.params;
  console.log(("=== ТИП И ЗНАЧЕНИЕ ID ==",typeof studentId, `|${studentId}|`));

  const student = await Student.findByIdAndDelete(studentId);

  if(!student){
    throw createHttpError(404, "Student not found");
  }

  res.status(200),json(student);
};

export const updateStudent = async (req, res) => {
  const {studentId} = req.params;

  const student = await Student.findOneAndUpdate(
    { _id: studentId }, req.body,
    {returnDocument: "after" },
  );

  if(!student){
    throw createHttpError(404, 'Student not found');
  }

  res.status(200).json(student);
};
