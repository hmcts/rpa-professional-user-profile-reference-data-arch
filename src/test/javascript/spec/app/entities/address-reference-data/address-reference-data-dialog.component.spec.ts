/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReferencedataTestModule } from '../../../test.module';
import { AddressReferenceDataDialogComponent } from '../../../../../../main/webapp/app/entities/address-reference-data/address-reference-data-dialog.component';
import { AddressReferenceDataService } from '../../../../../../main/webapp/app/entities/address-reference-data/address-reference-data.service';
import { AddressReferenceData } from '../../../../../../main/webapp/app/entities/address-reference-data/address-reference-data.model';
import { AddressTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/address-type-reference-data';
import { OrganisationReferenceDataService } from '../../../../../../main/webapp/app/entities/organisation-reference-data';

describe('Component Tests', () => {

    describe('AddressReferenceData Management Dialog Component', () => {
        let comp: AddressReferenceDataDialogComponent;
        let fixture: ComponentFixture<AddressReferenceDataDialogComponent>;
        let service: AddressReferenceDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [AddressReferenceDataDialogComponent],
                providers: [
                    AddressTypeReferenceDataService,
                    OrganisationReferenceDataService,
                    AddressReferenceDataService
                ]
            })
            .overrideTemplate(AddressReferenceDataDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressReferenceDataDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressReferenceDataService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressReferenceData(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.address = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AddressReferenceData();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.address = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'addressListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
