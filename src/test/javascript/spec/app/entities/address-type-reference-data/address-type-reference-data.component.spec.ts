/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ReferencedataTestModule } from '../../../test.module';
import { AddressTypeReferenceDataComponent } from '../../../../../../main/webapp/app/entities/address-type-reference-data/address-type-reference-data.component';
import { AddressTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/address-type-reference-data/address-type-reference-data.service';
import { AddressTypeReferenceData } from '../../../../../../main/webapp/app/entities/address-type-reference-data/address-type-reference-data.model';

describe('Component Tests', () => {

    describe('AddressTypeReferenceData Management Component', () => {
        let comp: AddressTypeReferenceDataComponent;
        let fixture: ComponentFixture<AddressTypeReferenceDataComponent>;
        let service: AddressTypeReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [AddressTypeReferenceDataComponent],
                providers: [
                    AddressTypeReferenceDataService
                ]
            })
            .overrideTemplate(AddressTypeReferenceDataComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressTypeReferenceDataComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressTypeReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AddressTypeReferenceData(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.addressTypes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
