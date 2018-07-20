import { extractHtml, extractTs } from './code-parsing';

describe('CodeParsing Utils', () => {
    it('#extractHtml should extract html from html file', () => {
        /*
         * Default extraction without ID provided
         */
        const extrDef1 = extractHtml(`
          <st-code-preview [id]="'example-1'">
            <h1> Some example buttons</h1>
          </st-code-preview>
        `);
        expect(extrDef1).not.toContain('st-code-preview');
        expect(extrDef1).toContain('<h1> Some example buttons</h1>');

        // component with multiple properties
        const extrDef2 = extractHtml(`
          <st-code-preview [someImputs]="test" class="class-name" [id]="'example-1'" *ngIf="false">
            <h1> Some example buttons</h1>
          </st-code-preview>
        `);
        expect(extrDef2).not.toContain('<st-code-preview [someImputs]="test" class="class-name" [id]="\'example-1\'" *ngIf="false">');
        expect(extrDef2).not.toContain('</st-code-preview>');
        expect(extrDef2).toContain('<h1> Some example buttons</h1>');

        // load first one when no id provided
        const extrDef3 = extractHtml(`
          <st-code-preview [id]="'example-1'">
            <h1>example-1</h1>
          </st-code-preview>         
           <st-code-preview [id]="'example-2'">
            <h1>example-2</h1>
          </st-code-preview>
        `);
        expect(extrDef3).not.toContain('st-code-preview');
        expect(extrDef3).not.toContain('<h1>example-2</h1>');
        expect(extrDef3).toContain('<h1>example-1</h1>');

        /*
         * Extraction with provided ID
         */
        const extrId1 = extractHtml(
            `
          <st-code-preview [id]="'example-1'">
            <h1>example-1</h1>
          </st-code-preview>
          <st-code-preview [id]="'example-2'">
            <h1>example-2</h1>
          </st-code-preview>
        `,
            'example-2'
        );
        expect(extrId1).not.toContain('st-code-preview');
        expect(extrId1).not.toContain('<h1>example-1</h1>');
        expect(extrId1).toContain('<h1>example-2</h1>');
    });

    it('#extractTs should return only class content', () => {
        const result = extractTs(`
        import { Component } from '@angular/core';
                  
        @Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss']
        })
        export class AppComponent {}
      `);
        expect(result).not.toContain(`@Component`);
        expect(result).not.toContain(`'./app.component.html'`);
        expect(result).not.toContain(`['./app.component.scss']`);
        expect(result).not.toContain(`import { Component } from '@angular/core';`);
        expect(result).not.toContain(`export class AppComponent {}`);
        expect(result).toContain(`class AppComponent {}`);
    });
});
