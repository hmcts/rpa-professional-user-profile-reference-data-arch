import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProfessionalUserAccountAssignmentReferenceData } from './professional-user-account-assignment-reference-data.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProfessionalUserAccountAssignmentReferenceData>;

@Injectable()
export class ProfessionalUserAccountAssignmentReferenceDataService {

    private resourceUrl =  SERVER_API_URL + 'api/professional-user-account-assignments';

    constructor(private http: HttpClient) { }

    create(professionalUserAccountAssignment: ProfessionalUserAccountAssignmentReferenceData):
        Observable<EntityResponseType> {
        const copy = this.convert(professionalUserAccountAssignment);
        return this.http.post<ProfessionalUserAccountAssignmentReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(professionalUserAccountAssignment: ProfessionalUserAccountAssignmentReferenceData):
        Observable<EntityResponseType> {
        const copy = this.convert(professionalUserAccountAssignment);
        return this.http.put<ProfessionalUserAccountAssignmentReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProfessionalUserAccountAssignmentReferenceData>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProfessionalUserAccountAssignmentReferenceData[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProfessionalUserAccountAssignmentReferenceData[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProfessionalUserAccountAssignmentReferenceData[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProfessionalUserAccountAssignmentReferenceData = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProfessionalUserAccountAssignmentReferenceData[]>): HttpResponse<ProfessionalUserAccountAssignmentReferenceData[]> {
        const jsonResponse: ProfessionalUserAccountAssignmentReferenceData[] = res.body;
        const body: ProfessionalUserAccountAssignmentReferenceData[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProfessionalUserAccountAssignmentReferenceData.
     */
    private convertItemFromServer(professionalUserAccountAssignment: ProfessionalUserAccountAssignmentReferenceData): ProfessionalUserAccountAssignmentReferenceData {
        const copy: ProfessionalUserAccountAssignmentReferenceData = Object.assign({}, professionalUserAccountAssignment);
        return copy;
    }

    /**
     * Convert a ProfessionalUserAccountAssignmentReferenceData to a JSON which can be sent to the server.
     */
    private convert(professionalUserAccountAssignment: ProfessionalUserAccountAssignmentReferenceData): ProfessionalUserAccountAssignmentReferenceData {
        const copy: ProfessionalUserAccountAssignmentReferenceData = Object.assign({}, professionalUserAccountAssignment);
        return copy;
    }
}
