import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-csr-modal',
  templateUrl: './csr-modal.component.html',
  styleUrls: ['./csr-modal.component.scss'],
})
export class CsrModalComponent implements OnInit {
  @ViewChild('content', { static: true }) public content!: TemplateRef<any>;
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    console.log(this.content);
    this.modalService.open(this.content, {
      ariaLabelledBy: 'csr-modal-title',
      size: 'xl',
    });
  }

  open(content: TemplateRef<any>) {}
}
