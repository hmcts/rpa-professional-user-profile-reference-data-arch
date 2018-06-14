/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReferencedataTestModule } from '../../../test.module';
import { ProfessionalUserReferenceDataComponent } from '../../../../../../main/webapp/app/entities/professional-user-reference-data/professional-user-reference-data.component';
import { ProfessionalUserReferenceDataService } from '../../../../../../main/webapp/app/entities/professional-user-reference-data/professional-user-reference-data.service';
import { ProfessionalUserReferenceData } from '../../../../../../main/webapp/app/entities/professional-user-reference-data/professional-user-reference-data.model';

describe('Component Tests', () => {

    describe('ProfessionalUserReferenceData Management Component', () => {
        let comp: ProfessionalUserReferenceDataComponent;
        let fixture: ComponentFixture<ProfessionalUserReferenceDataComponent>;
        let service: ProfessionalUserReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [ProfessionalUserReferenceDataComponent],
                providers: [
                    ProfessionalUserReferenceDataService
                ]
            })
            .overrideTemplate(ProfessionalUserReferenceDataComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfessionalUserReferenceDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfessionalUserReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ProfessionalUserReferenceData(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.professionalUsers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
