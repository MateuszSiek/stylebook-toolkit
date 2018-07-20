import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CodePreviewService } from '../services/code-preview.service';
import { CodePreviewMenuItem } from '../models/code-preview';

@Component({
    selector: 'st-code-preview-menu',
    templateUrl: './code-preview-menu.component.html',
    host: {
        '[class]': 'classNames'
    },
    styleUrls: ['./code-preview-menu.component.scss']
})
export class CodePreviewMenuComponent implements OnInit {
    @Input() public menuId?: string;
    public menuItems: Observable<CodePreviewMenuItem[]>;
    public classNames: string = '';

    constructor(private codePreviewService: CodePreviewService) {}

    public ngOnInit(): void {
        this.menuItems = this.codePreviewService.getMenuItems(this.menuId);
        const uniqueId = this.menuId ? `st-code-preview-menu__${this.menuId}` : '';
        this.classNames = `st-code-preview-menu ${uniqueId}`;
    }
}
