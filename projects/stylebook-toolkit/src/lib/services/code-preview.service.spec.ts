import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CodePreviewService } from './code-preview.service';
import { CodePreview, CodePreviewMenuItem } from '../models/code-preview';
import { of } from 'rxjs';
import { ST_CONFIG_TOKEN } from '../config';
import { stringToAnchorLink } from '../utils/misc';

describe('CodePreviewService', () => {
    let service: CodePreviewService;
    let httpClient: HttpClient;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                CodePreviewService,
                {
                    provide: ST_CONFIG_TOKEN,
                    useValue: {
                        fileExtensions: ['html', 'ts', 'css'],
                        lazyLoad: true,
                        fileSubName: 'component'
                    }
                }
            ]
        });
        service = TestBed.get(CodePreviewService);
        httpClient = TestBed.get(HttpClient);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make load request for each file and parse html and ts content', () => {
        let result: CodePreview[];
        const spy = spyOn(httpClient, 'get');
        spy.and.returnValues(of(`<st-code-preview><h1>Example</h1></st-code-preview>`), of(`export class AppComponent {}`), of(`.test{}`));
        service.getSourceCode('', '').subscribe((r: CodePreview[]) => (result = r));

        expect(spy).toHaveBeenCalledTimes(3);
        expect(result[0]).toEqual({ fileExtension: 'html', sourceCode: `<h1>Example</h1>` });
        expect(result[1]).toEqual({ fileExtension: 'ts', sourceCode: `class AppComponent {}` });
        expect(result[2]).toEqual({ fileExtension: 'css', sourceCode: `.test{}` });
    });

    it('#registerMenuItem should register new menu item', () => {
        let menuItems: CodePreviewMenuItem[];
        service.menuItems.subscribe(m => (menuItems = m));
        expect(menuItems).toEqual([]);
        service.registerMenuItem('itemName', 'menuID');
        expect(menuItems).toEqual([{ menuId: 'menuID', label: 'itemName', link: stringToAnchorLink('itemName') }]);
    });

    it('#unregisterMenuItem should remove menu item from list', () => {
        let menuItems: CodePreviewMenuItem[];
        service.menuItems.subscribe(m => (menuItems = m));
        service.registerMenuItem('itemName', 'menuID');
        service.registerMenuItem('itemName1', 'menuID');
        expect(menuItems.length).toEqual(2);
        service.unregisterMenuItem('itemName1', 'menuID');
        expect(menuItems).toEqual([{ menuId: 'menuID', label: 'itemName', link: stringToAnchorLink('itemName') }]);
    });

    it('#getMenuItems should return filtered menu items without duplicates', () => {
        let menuItems: CodePreviewMenuItem[];
        service.getMenuItems('menuID1').subscribe(m => (menuItems = m));
        service.registerMenuItem('itemName', 'menuID1');
        service.registerMenuItem('itemName', 'menuID1');
        service.registerMenuItem('itemName', 'menuID2');
        service.registerMenuItem('itemName', 'menuID2');
        expect(menuItems).toEqual([{ menuId: 'menuID1', label: 'itemName', link: stringToAnchorLink('itemName') }]);
    });
});
