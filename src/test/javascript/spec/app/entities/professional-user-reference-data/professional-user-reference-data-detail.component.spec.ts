/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReferencedataTestModule } from '../../../test.module';
import { ProfessionalUserReferenceDataDetailComponent } from '../../../../../../main/webapp/app/entities/professional-user-reference-data/professional-user-reference-data-detail.component';
import { ProfessionalUserReferenceDataService } from '../../../../../../main/webapp/app/entities/professional-user-reference-data/professional-user-reference-data.service';
import { ProfessionalUserReferenceData } from '../../../../../../main/webapp/app/entities/professional-user-reference-data/professional-user-reference-data.model';

describe('Component Tests', () => {

    describe('ProfessionalUserReferenceData Management Detail Component', () => {
        let comp: ProfessionalUserReferenceDataDetailComponent;
        let fixture: ComponentFixture<ProfessionalUserReferenceDataDetailComponent>;
        let service: ProfessionalUserReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [ProfessionalUserReferenceDataDetailComponent],
                providers: [
                    ProfessionalUserReferenceDataService
                ]
            })
            .overrideTemplate(ProfessionalUserReferenceDataDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProfessionalUserReferenceDataDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProfessionalUserReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ProfessionalUserReferenceData(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.professionalUser).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
