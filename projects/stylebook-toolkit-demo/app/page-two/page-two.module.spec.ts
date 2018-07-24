import { PageTwoModule } from './page-two.module';

describe('PageTwoModule', () => {
    let pageTwoModule: PageTwoModule;

    beforeEach(() => {
        pageTwoModule = new PageTwoModule();
    });

    it('should create an instance', () => {
        expect(pageTwoModule).toBeTruthy();
    });
});
