/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReferencedataTestModule } from '../../../test.module';
import { PaymentAccountReferenceDataDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/payment-account-reference-data/payment-account-reference-data-delete-dialog.component';
import { PaymentAccountReferenceDataService } from '../../../../../../main/webapp/app/entities/payment-account-reference-data/payment-account-reference-data.service';

describe('Component Tests', () => {

    describe('PaymentAccountReferenceData Management Delete Component', () => {
        let comp: PaymentAccountReferenceDataDeleteDialogComponent;
        let fixture: ComponentFixture<PaymentAccountReferenceDataDeleteDialogComponent>;
        let service: PaymentAccountReferenceDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [PaymentAccountReferenceDataDeleteDialogComponent],
                providers: [
                    PaymentAccountReferenceDataService
                ]
            })
            .overrideTemplate(PaymentAccountReferenceDataDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(PaymentAccountReferenceDataDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PaymentAccountReferenceDataService);
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
