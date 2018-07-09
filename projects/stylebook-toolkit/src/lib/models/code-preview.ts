export interface CodePreview {
    fileExtension: string;
    sourceCode: string;
}

export class StCodePreviewConfig {
    public fileExtensions: string[] = ['html', 'ts', 'scss'];
    public lazyLoad: boolean = true;
    public fileSubName?: string = 'component';
}
