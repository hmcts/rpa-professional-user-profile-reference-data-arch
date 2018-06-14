/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReferencedataTestModule } from '../../../test.module';
import { OrganisationTypeReferenceDataComponent } from '../../../../../../main/webapp/app/entities/organisation-type-reference-data/organisation-type-reference-data.component';
import { OrganisationTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/organisation-type-reference-data/organisation-type-reference-data.service';
import { OrganisationTypeReferenceData } from '../../../../../../main/webapp/app/entities/organisation-type-reference-data/organisation-type-reference-data.model';

describe('Component Tests', () => {

    describe('OrganisationTypeReferenceData Management Component', () => {
        let comp: OrganisationTypeReferenceDataComponent;
        let fixture: ComponentFixture<OrganisationTypeReferenceDataComponent>;
        let service: OrganisationTypeReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [OrganisationTypeReferenceDataComponent],
                providers: [
                    OrganisationTypeReferenceDataService
                ]
            })
            .overrideTemplate(OrganisationTypeReferenceDataComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationTypeReferenceDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationTypeReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrganisationTypeReferenceData(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.organisationTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
