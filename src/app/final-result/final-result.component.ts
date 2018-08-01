import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-final-result',
  templateUrl: './final-result.component.html',
  styleUrls: ['./final-result.component.css']
})
export class FinalResultComponent implements OnInit {

    constructor(
        public thisDialogRef: MatDialogRef<FinalResultComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) { }

    ngOnInit() {
    }

    searchLocalStore(itemNumber, itemName) {
        this.thisDialogRef.close(itemNumber + " " + itemName)
    }

    onCloseConfirm() {
        this.thisDialogRef.close('Confirm')
    }

    onCloseCancel() {
        this.thisDialogRef.close('No Item Selected')
    }

}
