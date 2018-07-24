import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';

import { CodePreview, CodePreviewMenuItem, StCodePreviewConfig } from '../models/code-preview';
import { extractHtml, extractTs } from '../utils/code-parsing';
import { removeDuplicates, stringToAnchorLink } from '../utils/misc';
import { ST_CONFIG_TOKEN } from '../config';

const DefaultMenuId: string = 'ST_MENU_DEFAULT';

@Injectable({
    providedIn: 'root'
})
export class CodePreviewService {
    public menuItems: BehaviorSubject<CodePreviewMenuItem[]> = new BehaviorSubject([]);

    constructor(private http: HttpClient, @Inject(ST_CONFIG_TOKEN) private config: StCodePreviewConfig) {}

    public registerMenuItem(menuItem: string, menuId: string = DefaultMenuId): void {
        const menuItems = this.getMenuItemsSnapshot();
        const newMenuItem = { menuId, label: menuItem, link: stringToAnchorLink(menuItem) };
        this.menuItems.next([...menuItems, newMenuItem]);
    }

    public unregisterMenuItem(menuItem: string, menuId: string = DefaultMenuId): void {
        const menuItems = this.getMenuItemsSnapshot().filter(
            (item: CodePreviewMenuItem) => !(item.menuId === menuId && item.label === menuItem)
        );
        this.menuItems.next(menuItems);
    }

    public getMenuItems(menuId: string = DefaultMenuId): Observable<CodePreviewMenuItem[]> {
        return this.menuItems.asObservable().pipe(
            map((items: CodePreviewMenuItem[]) => items.filter((item: CodePreviewMenuItem) => item.menuId === menuId)),
            map((items: CodePreviewMenuItem[]) => removeDuplicates<CodePreviewMenuItem>(items, 'label'))
        );
    }

    public getSourceCode(
        src: string,
        componentName: string,
        config: Partial<StCodePreviewConfig> = {},
        selectId?: string
    ): Observable<CodePreview[]> {
        const fileExtensionsToLoad: string[] = config.fileExtensions || this.config.fileExtensions;
        const fileSubName: string = config.fileSubName || this.config.fileSubName;
        const getObservables = [];

        fileExtensionsToLoad.forEach((fileExt: string) => {
            const fileName = [componentName, fileSubName, fileExt].filter(s => !!s).join('.');
            getObservables.push(this.http.get(`${src}/${fileName}`, { responseType: 'text' }).pipe(catchError(this.handleError)));
        });
        return forkJoin(getObservables).pipe(
            map((result: string[]) => {
                return result.filter(s => !!(s && s.length)).map((fileSourceCode: string | undefined, idx: number) => {
                    const fileExtension = fileExtensionsToLoad[idx];
                    const extractedCode = this.extractCode(fileSourceCode, selectId, fileExtension);
                    return { fileExtension, sourceCode: extractedCode };
                });
            })
        );
    }

    private extractCode(input: string, selectId: string, fileExtension: string): string {
        switch (fileExtension) {
            case 'html':
                return extractHtml(input, selectId);
            case 'ts':
                return extractTs(input);
        }
        return input;
    }

    private getMenuItemsSnapshot(): CodePreviewMenuItem[] {
        let menuItems: CodePreviewMenuItem[] = [];
        this.menuItems.pipe(take(1)).subscribe((m: CodePreviewMenuItem[]) => (menuItems = m));
        return menuItems;
    }

    private handleError(error: HttpErrorResponse): Observable<string> {
        if (error.status === 404) {
            console.error(`Could not load requested file make sure you provide valid component inputs;`, error.message);
        } else if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
        }
        return of('');
    }
}
