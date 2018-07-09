import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { forkJoin, Observable, of } from 'rxjs';
import { CodePreview, StCodePreviewConfig } from '../models/code-preview';
import { catchError, map } from 'rxjs/operators';
import { CONFIG } from '../stylebook-toolkit.module';

@Injectable({
    providedIn: 'root'
})
export class CodePreviewService {
    private config: StCodePreviewConfig;

    constructor(private http: HttpClient, @Inject(CONFIG) config: StCodePreviewConfig) {
        this.config = config;
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

export function extractHtml(text: string, selectId?: string): string | undefined {
    let regExp;
    if (selectId) {
        regExp = new RegExp(`<st-code-preview(.*?)${selectId}(.*?)>(.*?)</st-code-preview>`, 'gs');
    } else {
        regExp = new RegExp('<st-code-preview(.*?)>(.*?)</st-code-preview>', 'gs');
    }
    const htmlMatch = regExp.exec(text);
    return htmlMatch && htmlMatch[htmlMatch.length - 1];
}

export function extractHtmlComments(text: string, selectId?: string): string[] {
    const html = extractHtml(text, selectId);
    const regExp = new RegExp(`<!--((.|\n|\t|\r)*?)-->`, 'gs');
    return (html.match(regExp) || []).map((comment: string) => {
        return comment
            .replace('<!--', '')
            .replace('-->', '')
            .replace(/ +(?= )/g, '')
            .trim();
    });
}

export function extractTs(text: string): string | undefined {
    if (!text) return undefined;
    const regExp = new RegExp(`export (.*?)$`, 'gs');
    const tsMatch = regExp.exec(text);
    return tsMatch ? tsMatch[1] : text;
}
