/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ReferencedataTestModule } from '../../../test.module';
import { AddressReferenceDataDetailComponent } from '../../../../../../main/webapp/app/entities/address-reference-data/address-reference-data-detail.component';
import { AddressReferenceDataService } from '../../../../../../main/webapp/app/entities/address-reference-data/address-reference-data.service';
import { AddressReferenceData } from '../../../../../../main/webapp/app/entities/address-reference-data/address-reference-data.model';

describe('Component Tests', () => {

    describe('AddressReferenceData Management Detail Component', () => {
        let comp: AddressReferenceDataDetailComponent;
        let fixture: ComponentFixture<AddressReferenceDataDetailComponent>;
        let service: AddressReferenceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ReferencedataTestModule],
                declarations: [AddressReferenceDataDetailComponent],
                providers: [
                    AddressReferenceDataService
                ]
            })
            .overrideTemplate(AddressReferenceDataDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AddressReferenceDataDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AddressReferenceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AddressReferenceData(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.address).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
