/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReferencedataTestModule } from '../../../test.module';
import { OrganisationReferenceDataComponent } from '../../../../../../main/webapp/app/entities/organisation-reference-data/organisation-reference-data.component';
import { OrganisationReferenceDataService } from '../../../../../../main/webapp/app/entities/organisation-reference-data/organisation-reference-data.service';
import { OrganisationReferenceData } from '../../../../../../main/webapp/app/entities/organisation-reference-data/organisation-reference-data.model';

describe('Component Tests', () => {

    describe('OrganisationReferenceData Management Component', () => {
        let comp: OrganisationReferenceDataComponent;
        let fixture: ComponentFixture<OrganisationReferenceDataComponent>;
        let service: OrganisationReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [OrganisationReferenceDataComponent],
                providers: [
                    OrganisationReferenceDataService
                ]
            })
            .overrideTemplate(OrganisationReferenceDataComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrganisationReferenceDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrganisationReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrganisationReferenceData(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.organisations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
