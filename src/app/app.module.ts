import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FinalResultComponent } from './final-result/final-result.component';
import {
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule
} from '@angular/material/';


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
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [DialogComponent],
  bootstrap: [AppComponent],
  entryComponents: [MyDialogComponent]
})
export class AppModule { }
