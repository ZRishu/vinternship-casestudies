import express from 'express';
import { InMemoryCourseRepository } from './repositories/InMemoryCourseRepository';
import { CourseService } from './services/CourseService';

const app = express();
app.use(express.json());

const courseRepo = new InMemoryCourseRepository();
const courseService = new CourseService(courseRepo);

// Seed a course so we have something to test deleting!
courseRepo.save({ id: "101", name: "Physics 101", capacity: 30, students: [] });

app.post('/courses/:id/enroll', async (req, res) => {
  try {
    const result = await courseService.enroll(req.params.id, req.body.studentId);
    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  }
});

app.get('/students/:id/courses', async (req, res) => {
  const courses = await courseService.getStudentCourses(req.params.id);
  res.json(courses);
});

// Admin Route to delete a course
app.delete('/courses/:id', async (req, res) => {
  try {
    const result = await courseService.deleteCourse(req.params.id);
    res.json(result);
  } catch (e: any) {
    res.status(404).json({ error: e.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));