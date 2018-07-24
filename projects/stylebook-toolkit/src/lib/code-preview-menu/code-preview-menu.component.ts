import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CodePreviewService } from '../services/code-preview.service';
import { CodePreviewMenuItem } from '../models/code-preview';

@Component({
    selector: 'st-code-preview-menu',
    templateUrl: './code-preview-menu.component.html',
    styleUrls: ['./code-preview-menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodePreviewMenuComponent implements OnInit {
    @HostBinding('attr.class') public hostClass: string = '';

    @Input() public menuId?: string;
    public menuItems: Observable<CodePreviewMenuItem[]>;

    constructor(private codePreviewService: CodePreviewService, private cdRef: ChangeDetectorRef) {}

    public ngOnInit(): void {
        this.menuItems = this.codePreviewService.getMenuItems(this.menuId).pipe(tap(_ => this.cdRef.markForCheck()));
        const uniqueId = this.menuId ? `st-code-preview-menu__${this.menuId}` : '';
        this.hostClass = `st-code-preview-menu ${uniqueId}`;
    }

    public scrollToViewElement(fragment: string): void {
        const element = document.querySelector('#' + fragment);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}
