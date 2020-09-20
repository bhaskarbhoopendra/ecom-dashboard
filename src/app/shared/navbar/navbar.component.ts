import {Component, Output, EventEmitter, OnInit, AfterViewInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {LayoutService} from '../services/layout.service';
import {ConfigService} from '../services/config.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {SocketSharedService} from '../../SocketShare.service';
import {CrudService} from 'service/crud.service';
import {TranslatorService} from 'app/translator.service';

export interface NewOrderModel {
    ORDERID: string;
    order: string;
    _id: string;
}

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
    // currentLang = 'en';
    public selectedLanguage: '';
    toggleClass = 'ft-maximize';
    placement = 'bottom-right';
    public isCollapsed = true;
    @Output()
    toggleHideSidebar = new EventEmitter<Object>();

    public config: any = {};
    public newOrdersList: Array<NewOrderModel> = [];
    public logo: any = '../../../assets/img/gallery/pietech-logo.png';

    constructor(public translate: TranslateService,
                private router: Router, private toastr: ToastrService, public crud: CrudService,
                private layoutService: LayoutService,
                private socketService: SocketSharedService,
                private configService: ConfigService, private translator: TranslatorService) {
        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');
        this.getBusinessInfo();

    }

    ngOnInit() {
        this.config = this.configService.templateConf;
        this.socketService.order$.subscribe((orderInfo: NewOrderModel) => {
            if (orderInfo) {
                if (Array.isArray(orderInfo) && orderInfo.length > 0) {
                    this.newOrdersList = orderInfo;
                } else {
                    if (this.newOrdersList.length === 5) {
                        const firstOrder = this.newOrdersList[0];
                        this.socketService.emitNotification({id: firstOrder._id});
                        this.newOrdersList.splice(0, 1, orderInfo);
                    } else {

                        this.newOrdersList.push(orderInfo);
                    }
                    this.playAudio();
                }
            }
        });
    }


    ngAfterViewInit() {
        if (this.config.layout.dir) {
            const dir = this.config.layout.dir;
            if (dir === 'rtl') {
                this.placement = 'bottom-left';
            } else if (dir === 'ltr') {
                this.placement = 'bottom-right';
            }
        }
    }

    // sets order as read and removed from the list
    public readOrder(index: number, _id: string, orderId: string): void {
        const body = {
            id: _id
        };
        this.socketService.emitNotification(body);
        this.newOrdersList.splice(index, 1);
        this.router.navigate(['vieworder/', orderId]);
    }

    // set's all order as read
    public markAllOrderAsRead(): void {
        this.newOrdersList = [];
    }

    // plays bell notification sound when a new order is received
    private playAudio(): void {
        const audio = new Audio('assets/bell.mp3');
        audio.play();
    }


    ChangeLanguage(language: string) {
        this.translate.use(language);
    }

    ToggleClass() {
        if (this.toggleClass === 'ft-maximize') {
            this.toggleClass = 'ft-minimize';
        } else {
            this.toggleClass = 'ft-maximize';
        }
    }

    signOut() {
        localStorage.clear();
        sessionStorage.clear();
        this.toastr.info('Logout successful', 'Success');
        this.router.navigate(['/login']);
    }

    toggleNotificationSidebar() {
        this.layoutService.emitChange(true);
    }

    toggleSidebar() {
        const appSidebar = document.getElementsByClassName('app-sidebar')[0];
        if (appSidebar.classList.contains('hide-sidebar')) {
            this.toggleHideSidebar.emit(false);
        } else {
            this.toggleHideSidebar.emit(true);
        }
    }

    getBusinessInfo() {
        this.crud.getBusinessInfoData().subscribe((res: any) => {
            if (res.response_data.dasboardLogo.imageUrl != '') {
                this.logo = res.response_data.dasboardLogo.imageUrl;
            }
        })
    }

    setLang(event) {
        this.translator.useLanguage(event.target.value);
    }

    getLangs() {
        return this.translator.getAvailableLanguages();
    }
}
