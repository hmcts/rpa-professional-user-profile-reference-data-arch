/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReferencedataTestModule } from '../../../test.module';
import { PaymentAccountTypeReferenceDataDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/payment-account-type-reference-data/payment-account-type-reference-data-delete-dialog.component';
import { PaymentAccountTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/payment-account-type-reference-data/payment-account-type-reference-data.service';

describe('Component Tests', () => {

    describe('PaymentAccountTypeReferenceData Management Delete Component', () => {
        let comp: PaymentAccountTypeReferenceDataDeleteDialogComponent;
        let fixture: ComponentFixture<PaymentAccountTypeReferenceDataDeleteDialogComponent>;
        let service: PaymentAccountTypeReferenceDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [PaymentAccountTypeReferenceDataDeleteDialogComponent],
                providers: [
                    PaymentAccountTypeReferenceDataService
                ]
            })
            .overrideTemplate(PaymentAccountTypeReferenceDataDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentAccountTypeReferenceDataDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentAccountTypeReferenceDataService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
