import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { CodePreviewService } from '../services/code-preview.service';
import { CodePreview, StCodePreviewConfig } from '../models/code-preview';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/internal/operators';
import { CONFIG } from '../stylebook-toolkit.module';

@Component({
    selector: 'st-code-preview',
    templateUrl: './code-preview.component.html',
    styleUrls: ['./code-preview.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodePreviewComponent implements OnInit {
    @Input() public title: string = '';
    @Input() public src: string = '';
    @Input() public componentName: string = '';
    @Input() public id?: string;
    @Input() public config: Partial<StCodePreviewConfig> = {};

    public showPreview: boolean = false;
    public globalConfig: StCodePreviewConfig;

    public codePreviewData?: Observable<CodePreview[]>;

    constructor(
        private codePreviewService: CodePreviewService,
        private cdRef: ChangeDetectorRef,
        @Inject(CONFIG) config: StCodePreviewConfig
    ) {
        this.globalConfig = config;
    }

    public ngOnInit(): void {
        const config = this.getComponentConfig();
        if (!config.lazyLoad) {
            this.loadCodePreview();
        }
    }

    public loadCodePreview(): void {
        if (!this.codePreviewData) {
            this.codePreviewData = this.codePreviewService.getSourceCode(this.src, this.componentName, this.config, this.id).pipe(take(1));
        }
    }

    public toggleCodePreview(): void {
        this.loadCodePreview();
        this.showPreview = !this.showPreview;
        this.cdRef.markForCheck();
    }

    private getComponentConfig(): StCodePreviewConfig {
        return { ...this.globalConfig, ...this.config };
    }
}
