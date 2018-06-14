import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OrganisationTypeReferenceData } from './organisation-type-reference-data.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OrganisationTypeReferenceData>;

@Injectable()
export class OrganisationTypeReferenceDataService {

    private resourceUrl =  SERVER_API_URL + 'api/organisation-types';

    constructor(private http: HttpClient) { }

    create(organisationType: OrganisationTypeReferenceData): Observable<EntityResponseType> {
        const copy = this.convert(organisationType);
        return this.http.post<OrganisationTypeReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(organisationType: OrganisationTypeReferenceData): Observable<EntityResponseType> {
        const copy = this.convert(organisationType);
        return this.http.put<OrganisationTypeReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OrganisationTypeReferenceData>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OrganisationTypeReferenceData[]>> {
        const options = createRequestOption(req);
        return this.http.get<OrganisationTypeReferenceData[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OrganisationTypeReferenceData[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OrganisationTypeReferenceData = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OrganisationTypeReferenceData[]>): HttpResponse<OrganisationTypeReferenceData[]> {
        const jsonResponse: OrganisationTypeReferenceData[] = res.body;
        const body: OrganisationTypeReferenceData[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OrganisationTypeReferenceData.
     */
    private convertItemFromServer(organisationType: OrganisationTypeReferenceData): OrganisationTypeReferenceData {
        const copy: OrganisationTypeReferenceData = Object.assign({}, organisationType);
        return copy;
    }

    /**
     * Convert a OrganisationTypeReferenceData to a JSON which can be sent to the server.
     */
    private convert(organisationType: OrganisationTypeReferenceData): OrganisationTypeReferenceData {
        const copy: OrganisationTypeReferenceData = Object.assign({}, organisationType);
        return copy;
    }
}
