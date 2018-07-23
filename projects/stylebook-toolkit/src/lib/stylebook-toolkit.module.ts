import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HighlightModule } from 'ngx-highlightjs';

import { CodePreviewComponent } from './code-preview/code-preview.component';
import { StCodePreviewConfig } from './models/code-preview';
import { CodePreviewMenuComponent } from './code-preview-menu/code-preview-menu.component';
import { DEFAULT_CONFIG, ST_CONFIG_TOKEN } from './config';

const IMPORT_EXPORT_DECLARATIONS = [CodePreviewComponent, CodePreviewMenuComponent];

@NgModule({
    imports: [HttpClientModule, BrowserModule, HighlightModule.forRoot()],
    declarations: [...IMPORT_EXPORT_DECLARATIONS],
    exports: [...IMPORT_EXPORT_DECLARATIONS],
    providers: [{ provide: ST_CONFIG_TOKEN, useValue: DEFAULT_CONFIG }]
})
export class StylebookToolkitModule {
    static forRoot(options?: Partial<StCodePreviewConfig>): ModuleWithProviders {
        return {
            ngModule: StylebookToolkitModule,
            providers: [{ provide: ST_CONFIG_TOKEN, useValue: { ...DEFAULT_CONFIG, ...options } }]
        };
    }
}
