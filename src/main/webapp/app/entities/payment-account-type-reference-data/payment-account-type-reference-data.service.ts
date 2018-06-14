import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PaymentAccountTypeReferenceData } from './payment-account-type-reference-data.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PaymentAccountTypeReferenceData>;

@Injectable()
export class PaymentAccountTypeReferenceDataService {

    private resourceUrl =  SERVER_API_URL + 'api/payment-account-types';

    constructor(private http: HttpClient) { }

    create(paymentAccountType: PaymentAccountTypeReferenceData):
        Observable<EntityResponseType> {
        const copy = this.convert(paymentAccountType);
        return this.http.post<PaymentAccountTypeReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(paymentAccountType: PaymentAccountTypeReferenceData):
        Observable<EntityResponseType> {
        const copy = this.convert(paymentAccountType);
        return this.http.put<PaymentAccountTypeReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PaymentAccountTypeReferenceData>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PaymentAccountTypeReferenceData[]>> {
        const options = createRequestOption(req);
        return this.http.get<PaymentAccountTypeReferenceData[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PaymentAccountTypeReferenceData[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PaymentAccountTypeReferenceData = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PaymentAccountTypeReferenceData[]>): HttpResponse<PaymentAccountTypeReferenceData[]> {
        const jsonResponse: PaymentAccountTypeReferenceData[] = res.body;
        const body: PaymentAccountTypeReferenceData[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PaymentAccountTypeReferenceData.
     */
    private convertItemFromServer(paymentAccountType: PaymentAccountTypeReferenceData): PaymentAccountTypeReferenceData {
        const copy: PaymentAccountTypeReferenceData = Object.assign({}, paymentAccountType);
        return copy;
    }

    /**
     * Convert a PaymentAccountTypeReferenceData to a JSON which can be sent to the server.
     */
    private convert(paymentAccountType: PaymentAccountTypeReferenceData): PaymentAccountTypeReferenceData {
        const copy: PaymentAccountTypeReferenceData = Object.assign({}, paymentAccountType);
        return copy;
    }
}
