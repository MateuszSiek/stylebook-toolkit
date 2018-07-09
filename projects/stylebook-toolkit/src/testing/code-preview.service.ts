import { Observable, of } from 'rxjs';
import { CodePreview } from '../lib/models/code-preview';

export class MockCodePreviewService {
    public getSourceCode(): Observable<CodePreview[]> {
        return of(MockCodePreview);
    }
}

export const MockCodePreview: CodePreview[] = [
    { fileExtension: 'html', sourceCode: `<h1>Example</h1>` },
    { fileExtension: 'ts', sourceCode: `class AppComponent {}` },
    { fileExtension: 'css', sourceCode: `.test{}` }
];
