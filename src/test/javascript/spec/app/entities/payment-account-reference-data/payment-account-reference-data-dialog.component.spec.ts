/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReferencedataTestModule } from '../../../test.module';
import { PaymentAccountReferenceDataDialogComponent } from '../../../../../../main/webapp/app/entities/payment-account-reference-data/payment-account-reference-data-dialog.component';
import { PaymentAccountReferenceDataService } from '../../../../../../main/webapp/app/entities/payment-account-reference-data/payment-account-reference-data.service';
import { PaymentAccountReferenceData } from '../../../../../../main/webapp/app/entities/payment-account-reference-data/payment-account-reference-data.model';
import { OrganisationReferenceDataService } from '../../../../../../main/webapp/app/entities/organisation-reference-data';
import { PaymentAccountTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/payment-account-type-reference-data';

describe('Component Tests', () => {

    describe('PaymentAccountReferenceData Management Dialog Component', () => {
        let comp: PaymentAccountReferenceDataDialogComponent;
        let fixture: ComponentFixture<PaymentAccountReferenceDataDialogComponent>;
        let service: PaymentAccountReferenceDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [PaymentAccountReferenceDataDialogComponent],
                providers: [
                    OrganisationReferenceDataService,
                    PaymentAccountTypeReferenceDataService,
                    PaymentAccountReferenceDataService
                ]
            })
            .overrideTemplate(PaymentAccountReferenceDataDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentAccountReferenceDataDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentAccountReferenceDataService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PaymentAccountReferenceData(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.paymentAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'paymentAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PaymentAccountReferenceData();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.paymentAccount = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'paymentAccountListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
