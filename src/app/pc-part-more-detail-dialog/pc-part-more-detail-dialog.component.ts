import { PCPart } from './../_classes/pc-part';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pc-part-more-detail-dialog',
  templateUrl: './pc-part-more-detail-dialog.component.html',
  styleUrls: ['./pc-part-more-detail-dialog.component.scss']
})
export class PcPartMoreDetailDialogComponent implements OnInit {

  currentPcPart: PCPart;

  constructor(@Inject(MAT_DIALOG_DATA) public data: PCPart) {
    this.currentPcPart = data;
  }

  ngOnInit(): void {
  }


  
  updateUrlForNotFoundImage() {
    this.currentPcPart.image = "../../assets/icons/error-404.svg";
  }

}
