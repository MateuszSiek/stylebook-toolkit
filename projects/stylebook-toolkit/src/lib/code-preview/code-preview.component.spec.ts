import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePreviewComponent } from './code-preview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HighlightModule } from 'ngx-highlightjs';
import { HttpClientModule } from '@angular/common/http';
import { CodePreviewService } from '../services/code-preview.service';
import { MockCodePreviewService } from '../../testing/code-preview.service';
import { DEFAULT_CONFIG, ST_CONFIG_TOKEN } from '../config';

describe('CodePreviewComponent', () => {
    let component: CodePreviewComponent;
    let fixture: ComponentFixture<CodePreviewComponent>;
    let codePreviewService: CodePreviewService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule, HighlightModule.forRoot()],
            declarations: [CodePreviewComponent],
            providers: [
                { provide: ST_CONFIG_TOKEN, useValue: DEFAULT_CONFIG },
                { provide: CodePreviewService, useClass: MockCodePreviewService }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CodePreviewComponent);
        component = fixture.componentInstance;
        component.menuItem = true;

        codePreviewService = TestBed.get(CodePreviewService);
        spyOn(codePreviewService, 'registerMenuItem');
        spyOn(codePreviewService, 'getSourceCode').and.callThrough();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load previews on preview toggle', () => {
        expect(component.codePreviewData).not.toBeDefined();
        expect(codePreviewService.getSourceCode).toHaveBeenCalledTimes(0);
        component.toggleCodePreview();
        expect(codePreviewService.getSourceCode).toHaveBeenCalledTimes(1);
        expect(component.codePreviewData).toBeDefined();
        component.toggleCodePreview();
        expect(codePreviewService.getSourceCode).toHaveBeenCalledTimes(1);
    });

    it('should register menu item', () => {
        expect(codePreviewService.registerMenuItem).toHaveBeenCalledWith(component.title, component.menuId);
    });
});
