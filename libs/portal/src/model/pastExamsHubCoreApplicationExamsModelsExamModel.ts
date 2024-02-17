/**
 * API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { PastExamsHubCoreApplicationExamPeriodsExamPeriodModel } from './pastExamsHubCoreApplicationExamPeriodsExamPeriodModel';
import { PastExamsHubCoreDomainEnumsCourseType } from './pastExamsHubCoreDomainEnumsCourseType';
import { PastExamsHubCoreDomainEnumsExamType } from './pastExamsHubCoreDomainEnumsExamType';
import { PastExamsHubCoreDomainEnumsFileType } from './pastExamsHubCoreDomainEnumsFileType';

export interface PastExamsHubCoreApplicationExamsModelsExamModel { 
    courseUid?: string;
    courseName?: string;
    courseType?: PastExamsHubCoreDomainEnumsCourseType;
    lecturerFirstName?: string;
    lecturerLastName?: string;
    studyYear?: number;
    espb?: number;
    examUid?: string;
    type?: PastExamsHubCoreDomainEnumsExamType;
    examDate?: Date;
    numberOfTasks?: number;
    notes?: string;
    periodUid?: string;
    examPeriod?: PastExamsHubCoreApplicationExamPeriodsExamPeriodModel;
    fileType?: PastExamsHubCoreDomainEnumsFileType;
    file?: string;
}