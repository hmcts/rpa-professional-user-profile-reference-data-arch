import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PaymentAccountReferenceData } from './payment-account-reference-data.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PaymentAccountReferenceData>;

@Injectable()
export class PaymentAccountReferenceDataService {

    private resourceUrl =  SERVER_API_URL + 'api/payment-accounts';

    constructor(private http: HttpClient) { }

    create(paymentAccount: PaymentAccountReferenceData): Observable<EntityResponseType> {
        const copy = this.convert(paymentAccount);
        return this.http.post<PaymentAccountReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(paymentAccount: PaymentAccountReferenceData): Observable<EntityResponseType> {
        const copy = this.convert(paymentAccount);
        return this.http.put<PaymentAccountReferenceData>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PaymentAccountReferenceData>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PaymentAccountReferenceData[]>> {
        const options = createRequestOption(req);
        return this.http.get<PaymentAccountReferenceData[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PaymentAccountReferenceData[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PaymentAccountReferenceData = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PaymentAccountReferenceData[]>): HttpResponse<PaymentAccountReferenceData[]> {
        const jsonResponse: PaymentAccountReferenceData[] = res.body;
        const body: PaymentAccountReferenceData[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PaymentAccountReferenceData.
     */
    private convertItemFromServer(paymentAccount: PaymentAccountReferenceData): PaymentAccountReferenceData {
        const copy: PaymentAccountReferenceData = Object.assign({}, paymentAccount);
        return copy;
    }

    /**
     * Convert a PaymentAccountReferenceData to a JSON which can be sent to the server.
     */
    private convert(paymentAccount: PaymentAccountReferenceData): PaymentAccountReferenceData {
        const copy: PaymentAccountReferenceData = Object.assign({}, paymentAccount);
        return copy;
    }
}
