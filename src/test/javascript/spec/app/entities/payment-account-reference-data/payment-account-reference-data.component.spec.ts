/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReferencedataTestModule } from '../../../test.module';
import { PaymentAccountReferenceDataComponent } from '../../../../../../main/webapp/app/entities/payment-account-reference-data/payment-account-reference-data.component';
import { PaymentAccountReferenceDataService } from '../../../../../../main/webapp/app/entities/payment-account-reference-data/payment-account-reference-data.service';
import { PaymentAccountReferenceData } from '../../../../../../main/webapp/app/entities/payment-account-reference-data/payment-account-reference-data.model';

describe('Component Tests', () => {

    describe('PaymentAccountReferenceData Management Component', () => {
        let comp: PaymentAccountReferenceDataComponent;
        let fixture: ComponentFixture<PaymentAccountReferenceDataComponent>;
        let service: PaymentAccountReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [PaymentAccountReferenceDataComponent],
                providers: [
                    PaymentAccountReferenceDataService
                ]
            })
            .overrideTemplate(PaymentAccountReferenceDataComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentAccountReferenceDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentAccountReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PaymentAccountReferenceData(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.paymentAccounts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
