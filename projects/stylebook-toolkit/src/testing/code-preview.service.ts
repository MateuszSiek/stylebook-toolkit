import { Observable, of } from 'rxjs';
import { CodePreview, CodePreviewMenuItem } from '../lib/models/code-preview';
import { MockCodePreview, MockMenuItems } from './mock-data';

export class MockCodePreviewService {
    public getSourceCode(): Observable<CodePreview[]> {
        return of(MockCodePreview);
    }

    public registerMenuItem(): void {}

    public unregisterMenuItem(): void {}

    public getMenuItems(): Observable<CodePreviewMenuItem[]> {
        return of(MockMenuItems);
    }
}
