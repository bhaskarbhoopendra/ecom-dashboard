import {Component, ViewContainerRef, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import {SocketSharedService} from './SocketShare.service';
import {CrudService} from '../service/crud.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    public exportRequestInterval;

    constructor(private router: Router, private socketService: SocketSharedService, private crud: CrudService) {
    }

    // calls the method every 10 seconds to get order exported data
    private getOrderExportUrl(): void {
        this.exportRequestInterval = setInterval(() => {
            this.crud.getData('orders/export/file/download').subscribe((res: any) => {
                if (res.response_code === 200) {
                    if (res.response_data.exportedFile.status === 'Completed') {
                        const publicId = res.response_data.exportedFile.publicId;
                        window.open(res.response_data.exportedFile.url, 'blank');
                        this.clearExportRequestInterval();
                        setTimeout(() => {
                            this.crud.deleteData(`orders/export/file/delete/${publicId}`).subscribe((reS: any) => {
                                if (reS.response_code === 200) {
                                    console.log('FILE DELETED');
                                }
                            }, error => {
                                console.log('FILE NOT DELETED');
                            });
                        }, 5000);
                    }
                }
            }, error => {
                console.log('API ERROR');
            });
        }, 5000);
    }

    // clears interval
    private clearExportRequestInterval(): void {
        if (this.exportRequestInterval) {
            clearInterval(this.exportRequestInterval);
            this.crud.setOrderExportRequest(false);
        }
    }

    ngOnInit() {
        this.crud.orderExport$.subscribe(status => {
            if (status) {
                this.getOrderExportUrl();
            } else {
                this.clearExportRequestInterval();
            }
        });
        Notification.requestPermission().then(permission => {
            
        });
        if (localStorage.getItem('login')) {
            this.socketService.connectToSocketServer();
        }
        this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }


}
