/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReferencedataTestModule } from '../../../test.module';
import { AddressTypeReferenceDataDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/address-type-reference-data/address-type-reference-data-delete-dialog.component';
import { AddressTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/address-type-reference-data/address-type-reference-data.service';

describe('Component Tests', () => {

    describe('AddressTypeReferenceData Management Delete Component', () => {
        let comp: AddressTypeReferenceDataDeleteDialogComponent;
        let fixture: ComponentFixture<AddressTypeReferenceDataDeleteDialogComponent>;
        let service: AddressTypeReferenceDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [AddressTypeReferenceDataDeleteDialogComponent],
                providers: [
                    AddressTypeReferenceDataService
                ]
            })
            .overrideTemplate(AddressTypeReferenceDataDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressTypeReferenceDataDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressTypeReferenceDataService);
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
