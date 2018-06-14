import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProfessionalUserReferenceData } from './professional-user-reference-data.model';
import { ProfessionalUserReferenceDataService } from './professional-user-reference-data.service';

@Component({
    selector: 'jhi-professional-user-reference-data-detail',
    templateUrl: './professional-user-reference-data-detail.component.html'
})
export class ProfessionalUserReferenceDataDetailComponent implements OnInit, OnDestroy {

    professionalUser: ProfessionalUserReferenceData;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private professionalUserService: ProfessionalUserReferenceDataService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProfessionalUsers();
    }

    load(id) {
        this.professionalUserService.find(id)
            .subscribe((professionalUserResponse: HttpResponse<ProfessionalUserReferenceData>) => {
                this.professionalUser = professionalUserResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProfessionalUsers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'professionalUserListModification',
            (response) => this.load(this.professionalUser.id)
        );
    }
}
