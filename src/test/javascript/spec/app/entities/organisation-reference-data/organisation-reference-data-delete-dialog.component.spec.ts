/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReferencedataTestModule } from '../../../test.module';
import { OrganisationReferenceDataDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/organisation-reference-data/organisation-reference-data-delete-dialog.component';
import { OrganisationReferenceDataService } from '../../../../../../main/webapp/app/entities/organisation-reference-data/organisation-reference-data.service';

describe('Component Tests', () => {

    describe('OrganisationReferenceData Management Delete Component', () => {
        let comp: OrganisationReferenceDataDeleteDialogComponent;
        let fixture: ComponentFixture<OrganisationReferenceDataDeleteDialogComponent>;
        let service: OrganisationReferenceDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [OrganisationReferenceDataDeleteDialogComponent],
                providers: [
                    OrganisationReferenceDataService
                ]
            })
            .overrideTemplate(OrganisationReferenceDataDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationReferenceDataDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationReferenceDataService);
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
