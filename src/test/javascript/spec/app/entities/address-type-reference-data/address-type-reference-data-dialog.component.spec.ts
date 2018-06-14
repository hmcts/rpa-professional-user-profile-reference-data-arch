/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReferencedataTestModule } from '../../../test.module';
import { AddressTypeReferenceDataDialogComponent } from '../../../../../../main/webapp/app/entities/address-type-reference-data/address-type-reference-data-dialog.component';
import { AddressTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/address-type-reference-data/address-type-reference-data.service';
import { AddressTypeReferenceData } from '../../../../../../main/webapp/app/entities/address-type-reference-data/address-type-reference-data.model';

describe('Component Tests', () => {

    describe('AddressTypeReferenceData Management Dialog Component', () => {
        let comp: AddressTypeReferenceDataDialogComponent;
        let fixture: ComponentFixture<AddressTypeReferenceDataDialogComponent>;
        let service: AddressTypeReferenceDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [AddressTypeReferenceDataDialogComponent],
                providers: [
                    AddressTypeReferenceDataService
                ]
            })
            .overrideTemplate(AddressTypeReferenceDataDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressTypeReferenceDataDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressTypeReferenceDataService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressTypeReferenceData(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.addressType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressTypeReferenceData();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.addressType = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressTypeListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
