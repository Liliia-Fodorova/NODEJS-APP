import createHttpError from "http-errors";
import { Student } from "../models/student.js";

export const getStudents = async (req, res) => {

  const { page = 1,
    perPage = 10,
    gender,
    minAvgMark,
    search,
    //сщзтування
    sortBy = "_id",
    sortOrder = "asc",
  } = req.query;

  const skip = ( page - 1) * perPage;

  const studentsQuery = Student.find();

  //фільтрація
  if (search) {
    studentsQuery.where({
      name: { $regex: search, $options: "i" },
    });
  }

  if (gender) {
    studentsQuery.where('gender').equals(gender);
  }
  if (minAvgMark) {
    studentsQuery.where('avgMark').gte(minAvgMark);
  }

  //пагінація і сортування
const [totalItems, students] = await Promise.all([
  studentsQuery.clone().countDocuments(),
  studentsQuery.skip(skip).limit(perPage).sort({[sortBy]: sortOrder}),
]);

  const totalPages = Math.ceil(totalItems / perPage);

    res.status(200).json({
      page,
      perPage,
      totalItems,
      totalPages,
      students
    });
};

export const getStudentById = async (req, res) => {
  const { studentId } = req.params;

  const student = await Student.findOne({ _id: studentId });
  // 1) Студента з таким id може не бути
  if (!student) {
    throw createHttpError(404, "Student not found");
  }

  res.status(200).json(student);
};

export const createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

export const deleteStudent = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndDelete({ _id: studentId });
  if (!student) {
    throw createHttpError(404, "Student not found");
  }

  res.status(200).json(student);
  // res.status(204).end();
};

export const updateStudent = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findOneAndUpdate({ _id: studentId }, req.body, {
    returnDocument: "after",
  });

  if (!student) {
    throw createHttpError(404, "Student not found");
  }

  res.status(200).json(student);
};
