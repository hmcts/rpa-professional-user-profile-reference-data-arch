import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AddressTypeReferenceData } from './address-type-reference-data.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AddressTypeReferenceData>;

@Injectable()
export class AddressTypeReferenceDataService {

    private resourceUrl =  SERVER_API_URL + 'api/address-types';

    constructor(private http: HttpClient) { }

    create(addressType: AddressTypeReferenceData): Observable<EntityResponseType> {
        const copy = this.convert(addressType);
        return this.http.post<AddressTypeReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(addressType: AddressTypeReferenceData): Observable<EntityResponseType> {
        const copy = this.convert(addressType);
        return this.http.put<AddressTypeReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AddressTypeReferenceData>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AddressTypeReferenceData[]>> {
        const options = createRequestOption(req);
        return this.http.get<AddressTypeReferenceData[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AddressTypeReferenceData[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AddressTypeReferenceData = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AddressTypeReferenceData[]>): HttpResponse<AddressTypeReferenceData[]> {
        const jsonResponse: AddressTypeReferenceData[] = res.body;
        const body: AddressTypeReferenceData[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AddressTypeReferenceData.
     */
    private convertItemFromServer(addressType: AddressTypeReferenceData): AddressTypeReferenceData {
        const copy: AddressTypeReferenceData = Object.assign({}, addressType);
        return copy;
    }

    /**
     * Convert a AddressTypeReferenceData to a JSON which can be sent to the server.
     */
    private convert(addressType: AddressTypeReferenceData): AddressTypeReferenceData {
        const copy: AddressTypeReferenceData = Object.assign({}, addressType);
        return copy;
    }
}
