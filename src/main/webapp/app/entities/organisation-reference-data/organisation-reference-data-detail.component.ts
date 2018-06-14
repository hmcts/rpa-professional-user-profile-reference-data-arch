import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrganisationReferenceData } from './organisation-reference-data.model';
import { OrganisationReferenceDataService } from './organisation-reference-data.service';

@Component({
    selector: 'jhi-organisation-reference-data-detail',
    templateUrl: './organisation-reference-data-detail.component.html'
})
export class OrganisationReferenceDataDetailComponent implements OnInit, OnDestroy {

    organisation: OrganisationReferenceData;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private organisationService: OrganisationReferenceDataService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrganisations();
    }

    load(id) {
        this.organisationService.find(id)
            .subscribe((organisationResponse: HttpResponse<OrganisationReferenceData>) => {
                this.organisation = organisationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrganisations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'organisationListModification',
            (response) => this.load(this.organisation.id)
        );
    }
}
