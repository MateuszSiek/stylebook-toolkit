export interface CodePreview {
    fileExtension: string;
    sourceCode: string;
}

export interface StCodePreviewConfig {
    fileExtensions: string[];
    lazyLoad: boolean;
    fileSubName?: string;
}

export interface CodePreviewMenuItem {
    menuId: string;
    label: string;
    link: string;
}
