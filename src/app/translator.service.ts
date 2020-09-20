import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
    providedIn: 'root'
})
export class TranslatorService {
    private defaultLanguage: string = 'en';

    private availablelangs = [
        {code: 'en', text: 'English'},
        {code: 'pt', text: 'Portuguese'},
        {code: 'ar', text: 'Arabic'}
    ];

    constructor(public translate: TranslateService) {
        if (!translate.getDefaultLang()) {
            translate.setDefaultLang(this.defaultLanguage);
        }

        this.useLanguage();

    }

    useLanguage(lang: string = null) {
        this.translate.use(lang || this.translate.getDefaultLang());
    }

    getAvailableLanguages() {
        return this.availablelangs;
    }

}


