import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StylebookToolkitModule } from 'stylebook-toolkit';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, StylebookToolkitModule.forRoot()],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
