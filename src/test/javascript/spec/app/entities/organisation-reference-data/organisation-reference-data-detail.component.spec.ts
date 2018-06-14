/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReferencedataTestModule } from '../../../test.module';
import { OrganisationReferenceDataDetailComponent } from '../../../../../../main/webapp/app/entities/organisation-reference-data/organisation-reference-data-detail.component';
import { OrganisationReferenceDataService } from '../../../../../../main/webapp/app/entities/organisation-reference-data/organisation-reference-data.service';
import { OrganisationReferenceData } from '../../../../../../main/webapp/app/entities/organisation-reference-data/organisation-reference-data.model';

describe('Component Tests', () => {

    describe('OrganisationReferenceData Management Detail Component', () => {
        let comp: OrganisationReferenceDataDetailComponent;
        let fixture: ComponentFixture<OrganisationReferenceDataDetailComponent>;
        let service: OrganisationReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [OrganisationReferenceDataDetailComponent],
                providers: [
                    OrganisationReferenceDataService
                ]
            })
            .overrideTemplate(OrganisationReferenceDataDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationReferenceDataDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrganisationReferenceData(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.organisation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
