/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReferencedataTestModule } from '../../../test.module';
import { ProfessionalUserAccountAssignmentReferenceDataDetailComponent } from '../../../../../../main/webapp/app/entities/professional-user-account-assignment-reference-data/professional-user-account-assignment-reference-data-detail.component';
import { ProfessionalUserAccountAssignmentReferenceDataService } from '../../../../../../main/webapp/app/entities/professional-user-account-assignment-reference-data/professional-user-account-assignment-reference-data.service';
import { ProfessionalUserAccountAssignmentReferenceData } from '../../../../../../main/webapp/app/entities/professional-user-account-assignment-reference-data/professional-user-account-assignment-reference-data.model';

describe('Component Tests', () => {

    describe('ProfessionalUserAccountAssignmentReferenceData Management Detail Component', () => {
        let comp: ProfessionalUserAccountAssignmentReferenceDataDetailComponent;
        let fixture: ComponentFixture<ProfessionalUserAccountAssignmentReferenceDataDetailComponent>;
        let service: ProfessionalUserAccountAssignmentReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [ProfessionalUserAccountAssignmentReferenceDataDetailComponent],
                providers: [
                    ProfessionalUserAccountAssignmentReferenceDataService
                ]
            })
            .overrideTemplate(ProfessionalUserAccountAssignmentReferenceDataDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfessionalUserAccountAssignmentReferenceDataDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfessionalUserAccountAssignmentReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProfessionalUserAccountAssignmentReferenceData(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.professionalUserAccountAssignment).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
