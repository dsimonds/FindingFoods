import { Component, OnInit, Injectable, NgModule } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MyDialogComponent } from '../my-dialog/my-dialog.component';
import { Http, Response, URLSearchParams } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
// import { Observable } from 'rxjs/Rx';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/forkJoin'
// import { Observable } from 'rxjs';

// import { AppComponent } from '../app.component'


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})

@Injectable()
export class DialogComponent implements OnInit {
    walApiRoot: string = "http://api.walmartlabs.com/v1/";
    apiKey: string = "cdbxet7ud8j6ad3eyukndug7";

    // openDialog()
    dialogResult: string = '';
    itemsReturned: any;

    // searchItem()
    itemName: string = '';
    response: any;
    itemResults: any[];
    loading: boolean;

    // searchStores
    zip: string = '';
    storeNumber: number;
    responseZip: any;
    fiveClosestStoreIds: number [];
    storeList: any [];
    // locationResults: any[];
    locationResults: object[];

    localItemResults: any[];

    // error message
    isError: boolean;
    errorMessage: string = '';





    constructor(public dialog: MatDialog, private http: Http) {
        this.itemResults = [];
        this.localItemResults = [];
        this.locationResults = [];
        this.loading = false;
        this.isError = false;
    }

    ngOnInit() {
        console.log('ngOnInit')
    }

    action() {
        this.loading = true;
        this.validateForm();
        // this.itemSearch().then( () => this.loading = false);
    }

    openDialog(location: object) {
        console.log('openDialog');
        console.log('results');
        console.log(this.itemResults);
        console.log(this.locationResults);



        // console.log(this.response);

        let dialogRef = this.dialog.open(MyDialogComponent, {
            width: '60vw',
            data: this.itemResults
            // data: 'This text is passed into the dialog'
            // data: this.searchItem()

        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog Closed: ${result}`);
            this.dialogResult = result;
            this.locationQtySearch(this.dialogResult, location);
        })

    }

    zipSearch() {
        let promise = new Promise((resolve, reject) => {
            // http://api.walmartlabs.com/v1/stores?format=json&apiKey=cdbxet7ud8j6ad3eyukndug7&zip=
            let apiUrl = `${this.walApiRoot}stores`
            let search = new URLSearchParams();
            search.set('format', 'json');
            search.set('apiKey', this.apiKey);
            search.set('zip', this.zip);
            // search.set('limit', '5');

            this.http.get(apiUrl, {search: search})
                .toPromise()
                .then(
                    (response) => {
                        this.locationResults = response.json()[0];
                        console.log(this.locationResults);
                        this.itemSearch(this.locationResults);
                },
                msg => {
                    reject();
                }
            )
        });
    }

    itemSearch(location: object) {
        let promise = new Promise((resolve, reject) => {
            let apiUrl = `${this.walApiRoot}search`
            let search = new URLSearchParams();
            search.set('format', 'json');
            search.set('apiKey', this.apiKey);
            search.set('query', this.itemName);

            this.http.get(apiUrl, {search: search})
                .toPromise()
                .then(
                    (response) => {
                        this.itemResults = response.json().items;
                        console.log(this.itemResults);
                        this.openDialog(location);
                        this.loading = false;
                },
                msg => {
                    reject();
                }
            )
        });
    }

    locationQtySearch(selectedItem: string, location: object) {
        console.log('locationQtySearch()');
        console.log('selectedItem');
        console.log(selectedItem);
        console.log('this.location');
        console.log(location.no);

        let promise = new Promise((resolve, reject) => {
            // https://search.mobile.walmart.com/v1/products-by-code/UPC/027242901605?storeId=1
            let apiUrl = `https://search.mobile.walmart.com/v1/products-by-code/UPC/${selectedItem}?storeId=${location.no}`
            // let search = new URLSearchParams();
            // search.set('format', 'json');
            // search.set('apiKey', this.apiKey);

            // this.http.get(apiUrl, {search: search})
            this.http.get(apiUrl)
                .toPromise()
                .then(
                    (response) => {
                        this.localItemResults = response.json().data;
                        console.log('this.localItemResults');
                        console.log(this.localItemResults);
                        this.loading = false;
                },
                msg => {
                    reject();
                }
            )
        });
    }


    validateForm():boolean {

        if (this.zip == '') {
            this.isError = true;
            console.log('Zip missing')
            this.errorMessage = 'Zip missing. Please enter a zip code to search';
            this.loading = false;
            return false;
        }

        if (!this.zip.match(/\b^\d{5}(?:[-\s]\d{4})?$\b/)) {
            this.isError = true;
            console.log('Zip not valid')
            this.errorMessage = 'Zip is not correct. Please fix zip code and retry search';
            this.loading = false;
            return false;
        }

        if (this.itemName == '') {
            this.isError = true;
            console.log('Item name missing')
            this.errorMessage = 'Item name missing. Please enter an item to search';
            this.loading = false;
            return false;
        }

        this.zipSearch();
        return true;


    }

    closeWindow() {
        this.isError = false;
    }






}
