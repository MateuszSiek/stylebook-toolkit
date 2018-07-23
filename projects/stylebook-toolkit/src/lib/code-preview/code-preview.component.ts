import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CodePreviewService } from '../services/code-preview.service';
import { CodePreview, StCodePreviewConfig } from '../models/code-preview';
import { stringToAnchorLink } from '../utils/misc';
import { ST_CONFIG_TOKEN } from '../../config';

@Component({
    selector: 'st-code-preview',
    templateUrl: './code-preview.component.html',
    styleUrls: ['./code-preview.component.scss'],
    host: {
        '[class]': 'classNames'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodePreviewComponent implements OnInit, OnDestroy {
    @Input() public title: string = '';
    @Input() public src: string = '';
    @Input() public componentName: string = '';
    @Input() public id?: string;
    @Input() public config: Partial<StCodePreviewConfig> = {};
    @Input() public menuItem: boolean = false;
    @Input() public menuId?: string;

    public classNames: string = '';

    public showPreview: boolean = false;

    public codePreviewData?: Observable<CodePreview[]>;

    constructor(
        @Inject(ST_CONFIG_TOKEN) private globalConfig: StCodePreviewConfig,
        private codePreviewService: CodePreviewService,
        private cdRef: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        const config = this.getComponentConfig();
        if (!config.lazyLoad) {
            this.loadCodePreview();
        }
        if (this.menuItem) {
            this.codePreviewService.registerMenuItem(this.title, this.menuId);
        }
        const uniqueId = this.id ? `st-code-preview__${this.id}` : '';
        this.classNames = `st-code-preview ${uniqueId}`;
    }

    public ngOnDestroy(): void {
        if (this.menuItem) {
            this.codePreviewService.unregisterMenuItem(this.title, this.menuId);
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

    public getMenuAnchorId(): string | undefined {
        return (this.menuItem && stringToAnchorLink(this.title)) || undefined;
    }

    private getComponentConfig(): StCodePreviewConfig {
        return { ...this.globalConfig, ...this.config };
    }
}
