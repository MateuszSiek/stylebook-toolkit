import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StylebookToolkitModule } from 'stylebook-toolkit';
import { AppRoutingModule } from './app-routing.module';
import { PageOneModule } from './page-one/page-one.module';
import { PageTwoModule } from './page-two/page-two.module';
import { CoreModule } from './core/core.module';

@NgModule({
    declarations: [AppComponent],
    imports: [CoreModule, StylebookToolkitModule.forRoot({ fileExtensions: ['html'] }), PageOneModule, PageTwoModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
