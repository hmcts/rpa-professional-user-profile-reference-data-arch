/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReferencedataTestModule } from '../../../test.module';
import { PaymentAccountTypeReferenceDataComponent } from '../../../../../../main/webapp/app/entities/payment-account-type-reference-data/payment-account-type-reference-data.component';
import { PaymentAccountTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/payment-account-type-reference-data/payment-account-type-reference-data.service';
import { PaymentAccountTypeReferenceData } from '../../../../../../main/webapp/app/entities/payment-account-type-reference-data/payment-account-type-reference-data.model';

describe('Component Tests', () => {

    describe('PaymentAccountTypeReferenceData Management Component', () => {
        let comp: PaymentAccountTypeReferenceDataComponent;
        let fixture: ComponentFixture<PaymentAccountTypeReferenceDataComponent>;
        let service: PaymentAccountTypeReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [PaymentAccountTypeReferenceDataComponent],
                providers: [
                    PaymentAccountTypeReferenceDataService
                ]
            })
            .overrideTemplate(PaymentAccountTypeReferenceDataComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentAccountTypeReferenceDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentAccountTypeReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new PaymentAccountTypeReferenceData(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.paymentAccountTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
