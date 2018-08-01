import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material'
import { MyDialogComponent } from '../my-dialog/my-dialog.component'
import { Http, Response } from '@angular/http';
// import { AppComponent } from '../app.component'


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {
    // openDialog()
    dialogResult: string = '';
    itemsReturned: any;

    // searchItem()
    itemName: string = '';
    response: any;

    // searchStores
    zip: string = '';
    storeNumber: number;
    responseZip: any;
    fiveClosestStoreIds: number [];
    storeList: any [];


    constructor(public dialog: MatDialog, private http: Http) { }

    ngOnInit() {
        console.log('ngOnInit')
    }

    openDialog() {
        console.log('openDialog');

        // console.log(this.response);

        let dialogRef = this.dialog.open(MyDialogComponent, {
            width: '600px',
            data: 'This text is passed into the dialog'
            // data: this.searchItem()

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog Closed: ${result}`);
            this.dialogResult = result;
        })

    }

    // search walmart api for items
    searchItem() {
    console.log('searchItem');

        this.http.get('http://api.walmartlabs.com/v1/search?format=json&apiKey=cdbxet7ud8j6ad3eyukndug7&query=' + this.itemName)
        .subscribe (
            (response) => {
                this.response = response.json().items;
                // this.response = response;
                console.log(this.response);
                console.log(this.response[0].name);

                console.log('openDialog');

                console.log('openDialog');
                let dialogRef = this.dialog.open(MyDialogComponent, {
                    width: '60vw',
                    data: this.response
                    // data: this.searchItem()

                });

                dialogRef.afterClosed().subscribe(result => {
                    console.log(`Dialog Closed: ${result}`);
                    this.dialogResult = result;
                })
            }
        )

        // console.log('store lookup');
        // this.http.get('http://api.walmartlabs.com/v1/stores?format=json&apiKey=cdbxet7ud8j6ad3eyukndug7&zip=' + this.zip)
        // .subscribe (
        //     (response) => {
        //         this.responseZip = response;
        //         console.log(this.responseZip.json())
        //
        //         for (let i=0; i<5; i++)
        //         {
        //             this.fiveClosestStoreIds[i] = this.responseZip.json()[i].no;
        //         }
        //
        //         console.log('Closest Store: ' + this.fiveClosestStoreIds)
        //         for (let i=0; i<10; i++) {
        //             this.storeNumber[i] = this.responseZip.json()[i].no;
        //             this.storeList[i] = this.responseZip.json()[i].streetAddress + ', '
        //                 + this.responseZip.json()[i].city + ', '
        //                 + this.responseZip.json()[i].stateProvCode + ', '
        //                 + this.responseZip.json()[i].zip;
        //         }
        //     }
        // )
    }



}
