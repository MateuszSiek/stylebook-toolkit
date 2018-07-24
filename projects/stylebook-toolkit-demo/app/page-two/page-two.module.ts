import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTwoComponent } from './page-two.component';
import { StylebookToolkitModule } from 'stylebook-toolkit';

@NgModule({
    imports: [CommonModule, StylebookToolkitModule],
    declarations: [PageTwoComponent],
    exports: [PageTwoComponent]
})
export class PageTwoModule {}
