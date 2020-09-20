import {Component} from '@angular/core';
import {CrudService} from '../../service/crud.service';
import {ToastrService} from 'ngx-toastr';

export interface NotificationModel {
    title: string;
    mssg: string;
}

@Component({
    selector: 'app-notifications-component',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
    public notificationData: NotificationModel;

    constructor(private crud: CrudService, private toastr: ToastrService) {
        this.notificationData = this.getDefaultValues();
    }

    // returns default values
    private getDefaultValues(): NotificationModel {
        return {
            title: '',
            mssg: ''
        }
    }

    // sends notification data
    public sendNotification(): void {
        this.crud.saveData('users/send/pushnotification/all', this.notificationData).subscribe((res: any) => {
            if (res.response_code === 200 || res.response_code === 201) {
                this.toastr.success('Notification sent successfully', 'Success');
                this.notificationData = this.getDefaultValues();
            } else {
                this.toastr.error(res.response_data, 'Error');
            }
        }, error => {
            this.toastr.error('Could not send notification.', 'Error');
        });
    }
}