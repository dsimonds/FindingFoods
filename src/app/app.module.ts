import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DialogComponent } from './dialog/dialog.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
} from '@angular/material/';
import { FinalResultComponent } from './final-result/final-result.component';


@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    MyDialogComponent,
    FinalResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MyDialogComponent]
})
export class AppModule { }
