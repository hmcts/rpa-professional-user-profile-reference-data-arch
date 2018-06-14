import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrganisationTypeReferenceData } from './organisation-type-reference-data.model';
import { OrganisationTypeReferenceDataService } from './organisation-type-reference-data.service';

@Component({
    selector: 'jhi-organisation-type-reference-data-detail',
    templateUrl: './organisation-type-reference-data-detail.component.html'
})
export class OrganisationTypeReferenceDataDetailComponent implements OnInit, OnDestroy {

    organisationType: OrganisationTypeReferenceData;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private organisationTypeService: OrganisationTypeReferenceDataService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrganisationTypes();
    }

    load(id) {
        this.organisationTypeService.find(id)
            .subscribe((organisationTypeResponse: HttpResponse<OrganisationTypeReferenceData>) => {
                this.organisationType = organisationTypeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrganisationTypes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'organisationTypeListModification',
            (response) => this.load(this.organisationType.id)
        );
    }
}
