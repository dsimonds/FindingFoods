import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MatDialog } from '@angular/material'
import { MyDialogComponent } from './my-dialog/my-dialog.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private http: Http, public dialog: MatDialog) {}

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

    searchStore() {
        this.http.get('http://api.walmartlabs.com/v1/stores?format=json&apiKey=cdbxet7ud8j6ad3eyukndug7&zip=' + this.zip)
        .subscribe (
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
        this.http.get('https://search.mobile.walmart.com/v1/products-by-code/UPC/027242901605?storeId=' + storeNumber)
        .subscribe (
            (response) => {
                this.response = response;
                console.log('itemStoreLookup(): ')
                console.log(this.response.json())
            }
        )

    }

    // search walmart api for items
    searchItem() {
        this.http.get('http://api.walmartlabs.com/v1/search?format=json&apiKey=cdbxet7ud8j6ad3eyukndug7&query=' + this.itemName)
        .subscribe (
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
