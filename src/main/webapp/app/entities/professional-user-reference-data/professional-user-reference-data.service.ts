import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProfessionalUserReferenceData } from './professional-user-reference-data.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ProfessionalUserReferenceData>;

@Injectable()
export class ProfessionalUserReferenceDataService {

    private resourceUrl =  SERVER_API_URL + 'api/professional-users';

    constructor(private http: HttpClient) { }

    create(professionalUser: ProfessionalUserReferenceData): Observable<EntityResponseType> {
        const copy = this.convert(professionalUser);
        return this.http.post<ProfessionalUserReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(professionalUser: ProfessionalUserReferenceData): Observable<EntityResponseType> {
        const copy = this.convert(professionalUser);
        return this.http.put<ProfessionalUserReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ProfessionalUserReferenceData>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ProfessionalUserReferenceData[]>> {
        const options = createRequestOption(req);
        return this.http.get<ProfessionalUserReferenceData[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ProfessionalUserReferenceData[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ProfessionalUserReferenceData = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ProfessionalUserReferenceData[]>): HttpResponse<ProfessionalUserReferenceData[]> {
        const jsonResponse: ProfessionalUserReferenceData[] = res.body;
        const body: ProfessionalUserReferenceData[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ProfessionalUserReferenceData.
     */
    private convertItemFromServer(professionalUser: ProfessionalUserReferenceData): ProfessionalUserReferenceData {
        const copy: ProfessionalUserReferenceData = Object.assign({}, professionalUser);
        return copy;
    }

    /**
     * Convert a ProfessionalUserReferenceData to a JSON which can be sent to the server.
     */
    private convert(professionalUser: ProfessionalUserReferenceData): ProfessionalUserReferenceData {
        const copy: ProfessionalUserReferenceData = Object.assign({}, professionalUser);
        return copy;
    }
}
