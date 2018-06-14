/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReferencedataTestModule } from '../../../test.module';
import { AddressTypeReferenceDataDetailComponent } from '../../../../../../main/webapp/app/entities/address-type-reference-data/address-type-reference-data-detail.component';
import { AddressTypeReferenceDataService } from '../../../../../../main/webapp/app/entities/address-type-reference-data/address-type-reference-data.service';
import { AddressTypeReferenceData } from '../../../../../../main/webapp/app/entities/address-type-reference-data/address-type-reference-data.model';

describe('Component Tests', () => {

    describe('AddressTypeReferenceData Management Detail Component', () => {
        let comp: AddressTypeReferenceDataDetailComponent;
        let fixture: ComponentFixture<AddressTypeReferenceDataDetailComponent>;
        let service: AddressTypeReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [AddressTypeReferenceDataDetailComponent],
                providers: [
                    AddressTypeReferenceDataService
                ]
            })
            .overrideTemplate(AddressTypeReferenceDataDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressTypeReferenceDataDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressTypeReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AddressTypeReferenceData(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.addressType).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
