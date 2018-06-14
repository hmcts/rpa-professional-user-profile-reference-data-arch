/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReferencedataTestModule } from '../../../test.module';
import { ProfessionalUserAccountAssignmentReferenceDataDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/professional-user-account-assignment-reference-data/professional-user-account-assignment-reference-data-delete-dialog.component';
import { ProfessionalUserAccountAssignmentReferenceDataService } from '../../../../../../main/webapp/app/entities/professional-user-account-assignment-reference-data/professional-user-account-assignment-reference-data.service';

describe('Component Tests', () => {

    describe('ProfessionalUserAccountAssignmentReferenceData Management Delete Component', () => {
        let comp: ProfessionalUserAccountAssignmentReferenceDataDeleteDialogComponent;
        let fixture: ComponentFixture<ProfessionalUserAccountAssignmentReferenceDataDeleteDialogComponent>;
        let service: ProfessionalUserAccountAssignmentReferenceDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [ProfessionalUserAccountAssignmentReferenceDataDeleteDialogComponent],
                providers: [
                    ProfessionalUserAccountAssignmentReferenceDataService
                ]
            })
            .overrideTemplate(ProfessionalUserAccountAssignmentReferenceDataDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfessionalUserAccountAssignmentReferenceDataDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfessionalUserAccountAssignmentReferenceDataService);
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
