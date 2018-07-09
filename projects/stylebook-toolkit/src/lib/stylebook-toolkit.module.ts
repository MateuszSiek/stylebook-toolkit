import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HighlightModule } from 'ngx-highlightjs';

import { CodePreviewComponent } from './code-preview/code-preview.component';
import { StCodePreviewConfig } from './models/code-preview';

export const CONFIG = new InjectionToken<StCodePreviewConfig>('CONFIG');

@NgModule({
    imports: [
        HttpClientModule,
        BrowserModule,
        HighlightModule.forRoot()
    ],
    declarations: [CodePreviewComponent],
    exports: [CodePreviewComponent]
})
export class StylebookToolkitModule {
    static forRoot(options?: Partial<StCodePreviewConfig>): ModuleWithProviders {
        return {
            ngModule: StylebookToolkitModule,
            providers: [{ provide: CONFIG, useValue: { ...new StCodePreviewConfig(), ...options } }]
        };
    }
}
