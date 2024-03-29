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
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { InlineResponse404 } from '../model/inlineResponse404';
import { PastExamsHubCoreApplicationExamsCommandCreateCreateExamCommandResult } from '../model/pastExamsHubCoreApplicationExamsCommandCreateCreateExamCommandResult';
import { PastExamsHubCoreApplicationExamsQueriesGetCollectionGetExamsQueryResult } from '../model/pastExamsHubCoreApplicationExamsQueriesGetCollectionGetExamsQueryResult';
import { PastExamsHubCoreApplicationExamsQueriesGetLatestExamsGetLatestExamsQueryResult } from '../model/pastExamsHubCoreApplicationExamsQueriesGetLatestExamsGetLatestExamsQueryResult';
import { PastExamsHubCoreApplicationExamsQueriesGetSingleGetExamQueryResult } from '../model/pastExamsHubCoreApplicationExamsQueriesGetSingleGetExamQueryResult';
import { PastExamsHubCoreDomainEnumsExamType } from '../model/pastExamsHubCoreDomainEnumsExamType';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class ExamsService {

    protected basePath = '/';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param examPeriodUid 
     * @param courseUid 
     * @param pageNumber 
     * @param pageSize 
     * @param searchText 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public examsGet(examPeriodUid?: string, courseUid?: string, pageNumber?: number, pageSize?: number, searchText?: string, observe?: 'body', reportProgress?: boolean): Observable<PastExamsHubCoreApplicationExamsQueriesGetCollectionGetExamsQueryResult>;
    public examsGet(examPeriodUid?: string, courseUid?: string, pageNumber?: number, pageSize?: number, searchText?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PastExamsHubCoreApplicationExamsQueriesGetCollectionGetExamsQueryResult>>;
    public examsGet(examPeriodUid?: string, courseUid?: string, pageNumber?: number, pageSize?: number, searchText?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PastExamsHubCoreApplicationExamsQueriesGetCollectionGetExamsQueryResult>>;
    public examsGet(examPeriodUid?: string, courseUid?: string, pageNumber?: number, pageSize?: number, searchText?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {






        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (examPeriodUid !== undefined && examPeriodUid !== null) {
            queryParameters = queryParameters.set('ExamPeriodUid', <any>examPeriodUid);
        }
        if (courseUid !== undefined && courseUid !== null) {
            queryParameters = queryParameters.set('CourseUid', <any>courseUid);
        }
        if (pageNumber !== undefined && pageNumber !== null) {
            queryParameters = queryParameters.set('PageNumber', <any>pageNumber);
        }
        if (pageSize !== undefined && pageSize !== null) {
            queryParameters = queryParameters.set('PageSize', <any>pageSize);
        }
        if (searchText !== undefined && searchText !== null) {
            queryParameters = queryParameters.set('SearchText', <any>searchText);
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<PastExamsHubCoreApplicationExamsQueriesGetCollectionGetExamsQueryResult>('get',`${this.basePath}/Exams`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public examsLatestExamsGet(observe?: 'body', reportProgress?: boolean): Observable<PastExamsHubCoreApplicationExamsQueriesGetLatestExamsGetLatestExamsQueryResult>;
    public examsLatestExamsGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PastExamsHubCoreApplicationExamsQueriesGetLatestExamsGetLatestExamsQueryResult>>;
    public examsLatestExamsGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PastExamsHubCoreApplicationExamsQueriesGetLatestExamsGetLatestExamsQueryResult>>;
    public examsLatestExamsGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<PastExamsHubCoreApplicationExamsQueriesGetLatestExamsGetLatestExamsQueryResult>('get',`${this.basePath}/Exams/LatestExams`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param uid 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public examsUidGet(uid: string, observe?: 'body', reportProgress?: boolean): Observable<PastExamsHubCoreApplicationExamsQueriesGetSingleGetExamQueryResult>;
    public examsUidGet(uid: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PastExamsHubCoreApplicationExamsQueriesGetSingleGetExamQueryResult>>;
    public examsUidGet(uid: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PastExamsHubCoreApplicationExamsQueriesGetSingleGetExamQueryResult>>;
    public examsUidGet(uid: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (uid === null || uid === undefined) {
            throw new Error('Required parameter uid was null or undefined when calling examsUidGet.');
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<PastExamsHubCoreApplicationExamsQueriesGetSingleGetExamQueryResult>('get',`${this.basePath}/Exams/${encodeURIComponent(String(uid))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param file 
     * @param courseUid 
     * @param periodUid 
     * @param type 
     * @param examDate 
     * @param numberOfTasks 
     * @param notes 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public examsUploadPostForm(file?: Blob, courseUid?: string, periodUid?: string, type?: PastExamsHubCoreDomainEnumsExamType, examDate?: Date, numberOfTasks?: number, notes?: string, observe?: 'body', reportProgress?: boolean): Observable<PastExamsHubCoreApplicationExamsCommandCreateCreateExamCommandResult>;
    public examsUploadPostForm(file?: Blob, courseUid?: string, periodUid?: string, type?: PastExamsHubCoreDomainEnumsExamType, examDate?: Date, numberOfTasks?: number, notes?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PastExamsHubCoreApplicationExamsCommandCreateCreateExamCommandResult>>;
    public examsUploadPostForm(file?: Blob, courseUid?: string, periodUid?: string, type?: PastExamsHubCoreDomainEnumsExamType, examDate?: Date, numberOfTasks?: number, notes?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PastExamsHubCoreApplicationExamsCommandCreateCreateExamCommandResult>>;
    public examsUploadPostForm(file?: Blob, courseUid?: string, periodUid?: string, type?: PastExamsHubCoreDomainEnumsExamType, examDate?: Date, numberOfTasks?: number, notes?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {








        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (courseUid !== undefined && courseUid !== null) {
            queryParameters = queryParameters.set('CourseUid', <any>courseUid);
        }
        if (periodUid !== undefined && periodUid !== null) {
            queryParameters = queryParameters.set('PeriodUid', <any>periodUid);
        }
        if (type !== undefined && type !== null) {
            queryParameters = queryParameters.set('Type', <any>type);
        }
        if (examDate !== undefined && examDate !== null) {
            queryParameters = queryParameters.set('ExamDate', <any>examDate.toISOString());
        }
        if (numberOfTasks !== undefined && numberOfTasks !== null) {
            queryParameters = queryParameters.set('NumberOfTasks', <any>numberOfTasks);
        }
        if (notes !== undefined && notes !== null) {
            queryParameters = queryParameters.set('Notes', <any>notes);
        }

        let headers = this.defaultHeaders;

        // authentication (Bearer) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'text/plain',
            'application/json',
            'text/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'multipart/form-data'
        ];

        const canConsumeForm = this.canConsumeForm(consumes);

        let formParams: { append(param: string, value: any): void; };
        let useForm = false;
        let convertFormParamsToString = false;
        // use FormData to transmit files using content-type "multipart/form-data"
        // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
        useForm = canConsumeForm;
        if (useForm) {
            formParams = new FormData();
        } else {
            formParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        }

        if (file !== undefined) {
            formParams = formParams.append('File', <any>file) as any || formParams;
        }

        return this.httpClient.request<PastExamsHubCoreApplicationExamsCommandCreateCreateExamCommandResult>('post',`${this.basePath}/Exams/upload`,
            {
                body: convertFormParamsToString ? formParams.toString() : formParams,
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
