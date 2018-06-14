/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReferencedataTestModule } from '../../../test.module';
import { PaymentAccountReferenceDataDetailComponent } from '../../../../../../main/webapp/app/entities/payment-account-reference-data/payment-account-reference-data-detail.component';
import { PaymentAccountReferenceDataService } from '../../../../../../main/webapp/app/entities/payment-account-reference-data/payment-account-reference-data.service';
import { PaymentAccountReferenceData } from '../../../../../../main/webapp/app/entities/payment-account-reference-data/payment-account-reference-data.model';

describe('Component Tests', () => {

    describe('PaymentAccountReferenceData Management Detail Component', () => {
        let comp: PaymentAccountReferenceDataDetailComponent;
        let fixture: ComponentFixture<PaymentAccountReferenceDataDetailComponent>;
        let service: PaymentAccountReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [PaymentAccountReferenceDataDetailComponent],
                providers: [
                    PaymentAccountReferenceDataService
                ]
            })
            .overrideTemplate(PaymentAccountReferenceDataDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentAccountReferenceDataDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentAccountReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new PaymentAccountReferenceData(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.paymentAccount).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
