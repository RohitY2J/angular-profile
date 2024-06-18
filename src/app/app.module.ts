import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExpandableDivComponent } from './expandable-div/expandable-div.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularIntroductionComponent } from './blog/blog.component';
import { MarkdownService } from './markdown.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpandableDivComponent,
    ProfileComponent,
    AngularIntroductionComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MarkdownService],
  bootstrap: [AppComponent]
})
export class AppModule { }
