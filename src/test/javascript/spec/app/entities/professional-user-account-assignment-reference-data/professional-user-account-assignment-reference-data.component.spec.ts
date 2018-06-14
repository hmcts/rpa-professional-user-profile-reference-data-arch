/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReferencedataTestModule } from '../../../test.module';
import { ProfessionalUserAccountAssignmentReferenceDataComponent } from '../../../../../../main/webapp/app/entities/professional-user-account-assignment-reference-data/professional-user-account-assignment-reference-data.component';
import { ProfessionalUserAccountAssignmentReferenceDataService } from '../../../../../../main/webapp/app/entities/professional-user-account-assignment-reference-data/professional-user-account-assignment-reference-data.service';
import { ProfessionalUserAccountAssignmentReferenceData } from '../../../../../../main/webapp/app/entities/professional-user-account-assignment-reference-data/professional-user-account-assignment-reference-data.model';

describe('Component Tests', () => {

    describe('ProfessionalUserAccountAssignmentReferenceData Management Component', () => {
        let comp: ProfessionalUserAccountAssignmentReferenceDataComponent;
        let fixture: ComponentFixture<ProfessionalUserAccountAssignmentReferenceDataComponent>;
        let service: ProfessionalUserAccountAssignmentReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [ProfessionalUserAccountAssignmentReferenceDataComponent],
                providers: [
                    ProfessionalUserAccountAssignmentReferenceDataService
                ]
            })
            .overrideTemplate(ProfessionalUserAccountAssignmentReferenceDataComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfessionalUserAccountAssignmentReferenceDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfessionalUserAccountAssignmentReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProfessionalUserAccountAssignmentReferenceData(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.professionalUserAccountAssignments[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
