import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-my-dialog',
    templateUrl: './my-dialog.component.html',
    styleUrls: ['./my-dialog.component.css']
})
export class MyDialogComponent implements OnInit {

    constructor(
        public thisDialogRef: MatDialogRef<MyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: string
    ) { }

    ngOnInit() {
    }

    searchLocalStore(itemUpc: number) {
        this.thisDialogRef.close(itemUpc)
    }

    onCloseConfirm() {
        this.thisDialogRef.close('Confirm')
    }

    onCloseCancel() {
        this.thisDialogRef.close('No Item Selected')
    }

}
