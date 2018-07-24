import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageOneComponent } from './page-one.component';
import { StylebookToolkitModule } from 'stylebook-toolkit';

@NgModule({
    imports: [CommonModule, StylebookToolkitModule],
    declarations: [PageOneComponent],
    exports: [PageOneComponent]
})
export class PageOneModule {}
