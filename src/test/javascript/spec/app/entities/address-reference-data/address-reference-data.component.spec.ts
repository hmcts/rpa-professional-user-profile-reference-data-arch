/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReferencedataTestModule } from '../../../test.module';
import { AddressReferenceDataComponent } from '../../../../../../main/webapp/app/entities/address-reference-data/address-reference-data.component';
import { AddressReferenceDataService } from '../../../../../../main/webapp/app/entities/address-reference-data/address-reference-data.service';
import { AddressReferenceData } from '../../../../../../main/webapp/app/entities/address-reference-data/address-reference-data.model';

describe('Component Tests', () => {

    describe('AddressReferenceData Management Component', () => {
        let comp: AddressReferenceDataComponent;
        let fixture: ComponentFixture<AddressReferenceDataComponent>;
        let service: AddressReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [AddressReferenceDataComponent],
                providers: [
                    AddressReferenceDataService
                ]
            })
            .overrideTemplate(AddressReferenceDataComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressReferenceDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AddressReferenceData(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.addresses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
