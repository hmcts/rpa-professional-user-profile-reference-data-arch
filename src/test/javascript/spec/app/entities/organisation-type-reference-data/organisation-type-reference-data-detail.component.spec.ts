/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReferencedataTestModule } from '../../../test.module';
import { OrganisationTypeReferenceDataDetailComponent } from '../../../../../../main/webapp/app/entities/organisation-type-reference-data/organisation-type-reference-data-detail.component';
import { OrganisationTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/organisation-type-reference-data/organisation-type-reference-data.service';
import { OrganisationTypeReferenceData } from '../../../../../../main/webapp/app/entities/organisation-type-reference-data/organisation-type-reference-data.model';

describe('Component Tests', () => {

    describe('OrganisationTypeReferenceData Management Detail Component', () => {
        let comp: OrganisationTypeReferenceDataDetailComponent;
        let fixture: ComponentFixture<OrganisationTypeReferenceDataDetailComponent>;
        let service: OrganisationTypeReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [OrganisationTypeReferenceDataDetailComponent],
                providers: [
                    OrganisationTypeReferenceDataService
                ]
            })
            .overrideTemplate(OrganisationTypeReferenceDataDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationTypeReferenceDataDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationTypeReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new OrganisationTypeReferenceData(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.organisationType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
