import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { DigitalBooksService } from './digitalbooks.service';
import { UserComponent } from './user/user.component';
import { SearchComponent } from './search/search.component';
import { BookTableComponent } from './book-table/book-table.component';
import { RouterModule } from '@angular/router';
import { ReaderComponent } from './reader/reader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { ViewcomponentComponent } from './viewcomponent/viewcomponent.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    UserComponent,
    SearchComponent,
    BookTableComponent,
    ReaderComponent,
    ViewcomponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  RouterModule,
  BrowserAnimationsModule,
  MatDialogModule,
  MatButtonModule
  ],
  providers: [
    DigitalBooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
