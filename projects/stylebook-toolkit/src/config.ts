import { StCodePreviewConfig } from './lib/models/code-preview';
import { InjectionToken } from '@angular/core';

export const DEFAULT_CONFIG: StCodePreviewConfig = {
    fileExtensions: ['html', 'ts', 'scss'],
    lazyLoad: true,
    fileSubName: 'component'
};

export const ST_CONFIG_TOKEN = new InjectionToken<StCodePreviewConfig>('ST_CONFIG_TOKEN');
