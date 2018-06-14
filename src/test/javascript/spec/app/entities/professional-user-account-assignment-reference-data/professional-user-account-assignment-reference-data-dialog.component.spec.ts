/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { ReferencedataTestModule } from '../../../test.module';
import { ProfessionalUserAccountAssignmentReferenceDataDialogComponent } from '../../../../../../main/webapp/app/entities/professional-user-account-assignment-reference-data/professional-user-account-assignment-reference-data-dialog.component';
import { ProfessionalUserAccountAssignmentReferenceDataService } from '../../../../../../main/webapp/app/entities/professional-user-account-assignment-reference-data/professional-user-account-assignment-reference-data.service';
import { ProfessionalUserAccountAssignmentReferenceData } from '../../../../../../main/webapp/app/entities/professional-user-account-assignment-reference-data/professional-user-account-assignment-reference-data.model';
import { PaymentAccountReferenceDataService } from '../../../../../../main/webapp/app/entities/payment-account-reference-data';
import { ProfessionalUserReferenceDataService } from '../../../../../../main/webapp/app/entities/professional-user-reference-data';

describe('Component Tests', () => {

    describe('ProfessionalUserAccountAssignmentReferenceData Management Dialog Component', () => {
        let comp: ProfessionalUserAccountAssignmentReferenceDataDialogComponent;
        let fixture: ComponentFixture<ProfessionalUserAccountAssignmentReferenceDataDialogComponent>;
        let service: ProfessionalUserAccountAssignmentReferenceDataService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [ProfessionalUserAccountAssignmentReferenceDataDialogComponent],
                providers: [
                    PaymentAccountReferenceDataService,
                    ProfessionalUserReferenceDataService,
                    ProfessionalUserAccountAssignmentReferenceDataService
                ]
            })
            .overrideTemplate(ProfessionalUserAccountAssignmentReferenceDataDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfessionalUserAccountAssignmentReferenceDataDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfessionalUserAccountAssignmentReferenceDataService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProfessionalUserAccountAssignmentReferenceData(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.professionalUserAccountAssignment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'professionalUserAccountAssignmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ProfessionalUserAccountAssignmentReferenceData();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.professionalUserAccountAssignment = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'professionalUserAccountAssignmentListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
