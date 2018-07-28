import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private http: Http) {}

    itemName: string = '';
    zip: string = '';
    response: any;
    returnedItemName: string = '';
    itemList = [];

    // search walmart api for items
    searchItem () {
        this.http.get('http://api.walmartlabs.com/v1/search?format=json&apiKey=cdbxet7ud8j6ad3eyukndug7&query=' + this.itemName)
        .subscribe (
            (response) => {
                this.response = response;
                console.log(this.response.json());
                console.log(this.response.json().items.length);

                for (let i=0; i<this.response.json().items.length; i++) {
                    this.itemList[i] = this.response.json().items[i].name;
                }

            }
        )
    }



    title = 'FindingFoods';
}
