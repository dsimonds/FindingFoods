import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MatDialog } from '@angular/material'
import { MyDialogComponent } from './my-dialog/my-dialog.component'
import { FinalResultComponent } from './final-result/final-result.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private http: Http, public dialog: MatDialog) {}
    walApiRoot: string = "http://api.walmartlabs.com/v1/";

    // openDialog()
    dialogResult: string = "";
    itemsReturned: any;

    storeLocation: string = '';
    zip: string = '';
    responseZip: any;
    storeList = [];
    storeNumber = [];
    closestStoreNumber: number;

    itemName: string = '';
    response: any;
    // itemList = [];
    // imgUrl = [];
    ngOnInit() {
        console.log('this.itemName');
        console.log(this.itemName);
    }
    searchStore() {
        let url = `${this.walApiRoot}stores?format=json&apiKey=cdbxet7ud8j6ad3eyukndug7&zip=${this.zip}`;

        this.http.get(url).subscribe (
            (response) => {
                this.responseZip = response;
                console.log(this.responseZip.json())
                // for (let i=0; i<this.responseZip.json().length; i++) {
                this.closestStoreNumber = this.responseZip.json()[0].no;
                console.log('Closest Store: ' + this.closestStoreNumber)
                for (let i=0; i<10; i++) {
                    this.storeNumber[i] = this.responseZip.json()[i].no;
                    this.storeList[i] = this.responseZip.json()[i].streetAddress + ', '
                        + this.responseZip.json()[i].city + ', '
                        + this.responseZip.json()[i].stateProvCode + ', '
                        + this.responseZip.json()[i].zip;
                }
                this.itemStoreLookup(this.closestStoreNumber);
            }
        )


    }

    itemStoreLookup(storeNumber) {
        let url = `${this.walApiRoot}products-by-code/UPC/027242901605?storeId=${this.storeNumber}`;

        this.http.get(url).subscribe (
            (response) => {
                this.response = response;
                console.log('itemStoreLookup(): ')
                console.log(this.response.json())
            }
        )

    }

    // search walmart api for items
    searchItem() {
        let url = `${this.walApiRoot}search?format=json&apiKey=cdbxet7ud8j6ad3eyukndug7&query=${this.itemName}`;

        this.http.get(url).subscribe (
            (response) => {
                this.response = response.json().items;
                // this.response = response;
                console.log(this.response);
                console.log(this.response[0].name);

                console.log('openDialog');

                // console.log(this.response);

                let dialogRef = this.dialog.open(MyDialogComponent, {
                    width: '600px',
                    data: this.response
                    // data: this.searchItem()

                });

                dialogRef.afterClosed().subscribe(result => {
                    console.log(`Dialog Closed: ${result}`);
                    this.dialogResult = result;
                })
            }
        )
    }



    title = 'FindingFoods';
}
