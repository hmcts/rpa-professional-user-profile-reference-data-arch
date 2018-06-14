import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ProfessionalUserAccountAssignmentReferenceData } from './professional-user-account-assignment-reference-data.model';
import { ProfessionalUserAccountAssignmentReferenceDataService } from './professional-user-account-assignment-reference-data.service';

@Component({
    selector: 'jhi-professional-user-account-assignment-reference-data-detail',
    templateUrl: './professional-user-account-assignment-reference-data-detail.component.html'
})
export class ProfessionalUserAccountAssignmentReferenceDataDetailComponent implements OnInit, OnDestroy {

    professionalUserAccountAssignment: ProfessionalUserAccountAssignmentReferenceData;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private professionalUserAccountAssignmentService: ProfessionalUserAccountAssignmentReferenceDataService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInProfessionalUserAccountAssignments();
    }

    load(id) {
        this.professionalUserAccountAssignmentService.find(id)
            .subscribe((professionalUserAccountAssignmentResponse: HttpResponse<ProfessionalUserAccountAssignmentReferenceData>) => {
                this.professionalUserAccountAssignment = professionalUserAccountAssignmentResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProfessionalUserAccountAssignments() {
        this.eventSubscriber = this.eventManager.subscribe(
            'professionalUserAccountAssignmentListModification',
            (response) => this.load(this.professionalUserAccountAssignment.id)
        );
    }
}
