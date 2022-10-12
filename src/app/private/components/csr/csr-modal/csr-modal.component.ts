import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-csr-modal',
  templateUrl: './csr-modal.component.html',
  styleUrls: ['./csr-modal.component.scss'],
})
export class CsrModalComponent implements OnInit {
  isCompany!: boolean;
  @ViewChild('content', { static: true }) public content!: TemplateRef<any>;
  constructor(
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.router.url.includes('companies')) this.isCompany = true;

    this.modalService.open(this.content, {
      ariaLabelledBy: 'csr-modal-title',
      size: 'xl',
    });
  }

  dismissModal(modal: any) {
    modal.dismiss();
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
