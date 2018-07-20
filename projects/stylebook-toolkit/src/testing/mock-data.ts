import {CodePreview, CodePreviewMenuItem} from '../lib/models/code-preview';

export const MockCodePreview: CodePreview[] = [
  { fileExtension: 'html', sourceCode: `<h1>Example</h1>` },
  { fileExtension: 'ts', sourceCode: `class AppComponent {}` },
  { fileExtension: 'css', sourceCode: `.test{}` }
];

export const MockMenuItems: CodePreviewMenuItem[] = [
  {
    menuId: 'menuID',
    label: 'label1',
    link: 'link1'
  },
  {
    menuId: 'menuID',
    label: 'label2',
    link: 'link2'
  },
  {
    menuId: 'menuID',
    label: 'label3',
    link: 'link3'
  }
];
