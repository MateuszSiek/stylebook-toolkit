import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

import { CodePreviewMenuComponent } from './code-preview-menu.component';
import { CodePreviewService } from '../services/code-preview.service';
import { MockCodePreviewService } from '../../testing/code-preview.service';
import { CodePreviewMenuItem } from '../models/code-preview';
import { MockMenuItems } from '../../testing/mock-data';

describe('CodePreviewMenuComponent', () => {
    let component: CodePreviewMenuComponent;
    let fixture: ComponentFixture<CodePreviewMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule],
            declarations: [CodePreviewMenuComponent],
            providers: [{ provide: CodePreviewService, useClass: MockCodePreviewService }]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CodePreviewMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        let menuItems: CodePreviewMenuItem[];
        expect(component).toBeTruthy();
        component.menuItems.subscribe(m => (menuItems = m));
        expect(menuItems).toEqual(MockMenuItems);
    });

    it('should render menu', () => {
        const viewMenuItems = fixture.nativeElement.querySelectorAll('.st-preview-menu__list-item');
        expect(viewMenuItems.length).toEqual(MockMenuItems.length);
        viewMenuItems.forEach((el: Element, idx: number) => {
            expect(el.innerHTML).toContain(MockMenuItems[idx].label);
            expect(el.innerHTML).toContain(MockMenuItems[idx].link);
        });
    });

    it('#scrollToViewElement should trigger scrollIntoView', () => {
        let scrolled: boolean = false;
        const element: any = { scrollIntoView: () => (scrolled = true) };
        spyOn(document, 'querySelector').and.returnValue(element);
        expect(scrolled).toBeFalsy();
        component.scrollToViewElement('');
        expect(scrolled).toBeTruthy();
    });
});
