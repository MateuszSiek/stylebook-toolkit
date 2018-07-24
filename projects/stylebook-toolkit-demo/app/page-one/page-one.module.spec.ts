import { PageOneModule } from './page-one.module';

describe('PageOneModule', () => {
    let pageOneModule: PageOneModule;

    beforeEach(() => {
        pageOneModule = new PageOneModule();
    });

    it('should create an instance', () => {
        expect(pageOneModule).toBeTruthy();
    });
});
