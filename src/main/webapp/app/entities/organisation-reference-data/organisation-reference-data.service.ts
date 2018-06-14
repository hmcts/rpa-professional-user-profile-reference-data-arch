import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrganisationReferenceData } from './organisation-reference-data.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrganisationReferenceData>;

@Injectable()
export class OrganisationReferenceDataService {

    private resourceUrl =  SERVER_API_URL + 'api/organisations';

    constructor(private http: HttpClient) { }

    create(organisation: OrganisationReferenceData): Observable<EntityResponseType> {
        const copy = this.convert(organisation);
        return this.http.post<OrganisationReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(organisation: OrganisationReferenceData): Observable<EntityResponseType> {
        const copy = this.convert(organisation);
        return this.http.put<OrganisationReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrganisationReferenceData>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrganisationReferenceData[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrganisationReferenceData[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrganisationReferenceData[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrganisationReferenceData = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrganisationReferenceData[]>): HttpResponse<OrganisationReferenceData[]> {
        const jsonResponse: OrganisationReferenceData[] = res.body;
        const body: OrganisationReferenceData[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrganisationReferenceData.
     */
    private convertItemFromServer(organisation: OrganisationReferenceData): OrganisationReferenceData {
        const copy: OrganisationReferenceData = Object.assign({}, organisation);
        return copy;
    }

    /**
     * Convert a OrganisationReferenceData to a JSON which can be sent to the server.
     */
    private convert(organisation: OrganisationReferenceData): OrganisationReferenceData {
        const copy: OrganisationReferenceData = Object.assign({}, organisation);
        return copy;
    }
}
