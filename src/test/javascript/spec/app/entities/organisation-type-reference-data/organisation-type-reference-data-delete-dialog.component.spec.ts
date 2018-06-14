/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReferencedataTestModule } from '../../../test.module';
import { OrganisationTypeReferenceDataDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/organisation-type-reference-data/organisation-type-reference-data-delete-dialog.component';
import { OrganisationTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/organisation-type-reference-data/organisation-type-reference-data.service';

describe('Component Tests', () => {

    describe('OrganisationTypeReferenceData Management Delete Component', () => {
        let comp: OrganisationTypeReferenceDataDeleteDialogComponent;
        let fixture: ComponentFixture<OrganisationTypeReferenceDataDeleteDialogComponent>;
        let service: OrganisationTypeReferenceDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [OrganisationTypeReferenceDataDeleteDialogComponent],
                providers: [
                    OrganisationTypeReferenceDataService
                ]
            })
            .overrideTemplate(OrganisationTypeReferenceDataDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationTypeReferenceDataDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationTypeReferenceDataService);
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
