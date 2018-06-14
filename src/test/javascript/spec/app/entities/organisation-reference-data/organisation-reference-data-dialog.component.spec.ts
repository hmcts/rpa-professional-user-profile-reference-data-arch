/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReferencedataTestModule } from '../../../test.module';
import { OrganisationReferenceDataDialogComponent } from '../../../../../../main/webapp/app/entities/organisation-reference-data/organisation-reference-data-dialog.component';
import { OrganisationReferenceDataService } from '../../../../../../main/webapp/app/entities/organisation-reference-data/organisation-reference-data.service';
import { OrganisationReferenceData } from '../../../../../../main/webapp/app/entities/organisation-reference-data/organisation-reference-data.model';
import { OrganisationTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/organisation-type-reference-data';

describe('Component Tests', () => {

    describe('OrganisationReferenceData Management Dialog Component', () => {
        let comp: OrganisationReferenceDataDialogComponent;
        let fixture: ComponentFixture<OrganisationReferenceDataDialogComponent>;
        let service: OrganisationReferenceDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [OrganisationReferenceDataDialogComponent],
                providers: [
                    OrganisationTypeReferenceDataService,
                    OrganisationReferenceDataService
                ]
            })
            .overrideTemplate(OrganisationReferenceDataDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationReferenceDataDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationReferenceDataService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrganisationReferenceData(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.organisation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'organisationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new OrganisationReferenceData();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.organisation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'organisationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
