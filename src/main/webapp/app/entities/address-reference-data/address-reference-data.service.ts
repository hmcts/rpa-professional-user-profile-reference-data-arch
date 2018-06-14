import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AddressReferenceData } from './address-reference-data.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AddressReferenceData>;

@Injectable()
export class AddressReferenceDataService {

    private resourceUrl =  SERVER_API_URL + 'api/addresses';

    constructor(private http: HttpClient) { }

    create(address: AddressReferenceData): Observable<EntityResponseType> {
        const copy = this.convert(address);
        return this.http.post<AddressReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(address: AddressReferenceData): Observable<EntityResponseType> {
        const copy = this.convert(address);
        return this.http.put<AddressReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AddressReferenceData>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AddressReferenceData[]>> {
        const options = createRequestOption(req);
        return this.http.get<AddressReferenceData[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AddressReferenceData[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AddressReferenceData = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AddressReferenceData[]>): HttpResponse<AddressReferenceData[]> {
        const jsonResponse: AddressReferenceData[] = res.body;
        const body: AddressReferenceData[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AddressReferenceData.
     */
    private convertItemFromServer(address: AddressReferenceData): AddressReferenceData {
        const copy: AddressReferenceData = Object.assign({}, address);
        return copy;
    }

    /**
     * Convert a AddressReferenceData to a JSON which can be sent to the server.
     */
    private convert(address: AddressReferenceData): AddressReferenceData {
        const copy: AddressReferenceData = Object.assign({}, address);
        return copy;
    }
}
