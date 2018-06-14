/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReferencedataTestModule } from '../../../test.module';
import { PaymentAccountTypeReferenceDataDialogComponent } from '../../../../../../main/webapp/app/entities/payment-account-type-reference-data/payment-account-type-reference-data-dialog.component';
import { PaymentAccountTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/payment-account-type-reference-data/payment-account-type-reference-data.service';
import { PaymentAccountTypeReferenceData } from '../../../../../../main/webapp/app/entities/payment-account-type-reference-data/payment-account-type-reference-data.model';

describe('Component Tests', () => {

    describe('PaymentAccountTypeReferenceData Management Dialog Component', () => {
        let comp: PaymentAccountTypeReferenceDataDialogComponent;
        let fixture: ComponentFixture<PaymentAccountTypeReferenceDataDialogComponent>;
        let service: PaymentAccountTypeReferenceDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [PaymentAccountTypeReferenceDataDialogComponent],
                providers: [
                    PaymentAccountTypeReferenceDataService
                ]
            })
            .overrideTemplate(PaymentAccountTypeReferenceDataDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentAccountTypeReferenceDataDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentAccountTypeReferenceDataService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PaymentAccountTypeReferenceData(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.paymentAccountType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'paymentAccountTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new PaymentAccountTypeReferenceData();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.paymentAccountType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'paymentAccountTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
