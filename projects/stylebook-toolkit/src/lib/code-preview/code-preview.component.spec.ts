import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePreviewComponent } from './code-preview.component';
import { HighlightModule } from 'ngx-highlightjs';
import { HttpClientModule } from '@angular/common/http';
import { CONFIG } from '../stylebook-toolkit.module';
import { CodePreviewService } from '../services/code-preview.service';
import { MockCodePreviewService } from '../../testing/code-preview.service';

describe('CodePreviewComponent', () => {
    let component: CodePreviewComponent;
    let codePreviewService: CodePreviewService;
    let fixture: ComponentFixture<CodePreviewComponent>;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientModule, HighlightModule.forRoot()],
                declarations: [CodePreviewComponent],
                providers: [
                    { provide: CodePreviewService, useClass: MockCodePreviewService },
                    {
                        provide: CONFIG,
                        useValue: {
                            fileExtensions: ['html', 'ts'],
                            lazyLoad: true,
                            fileSubName: 'component'
                        }
                    }
                ]
            }).compileComponents();
            codePreviewService = TestBed.get(CodePreviewService);
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CodePreviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load previews on preview toggle', () => {
        const spy = spyOn(codePreviewService, 'getSourceCode').and.callThrough();
        expect(component.codePreviewData).not.toBeDefined();
        expect(spy).toHaveBeenCalledTimes(0);
        component.toggleCodePreview();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(component.codePreviewData).toBeDefined();
        component.toggleCodePreview();
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
