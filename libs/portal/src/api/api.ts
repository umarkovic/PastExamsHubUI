export * from './courses.service';
import { CoursesService } from './courses.service';
export * from './examPeriods.service';
import { ExamPeriodsService } from './examPeriods.service';
export * from './examSolution.service';
import { ExamSolutionService } from './examSolution.service';
export * from './exams.service';
import { ExamsService } from './exams.service';
export * from './statistics.service';
import { StatisticsService } from './statistics.service';
export * from './teachers.service';
import { TeachersService } from './teachers.service';
export * from './users.service';
import { UsersService } from './users.service';
export const APIS = [CoursesService, ExamPeriodsService, ExamSolutionService, ExamsService, StatisticsService, TeachersService, UsersService];
