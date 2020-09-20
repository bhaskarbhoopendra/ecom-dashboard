import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {ConstantService} from './constant.service';
import * as SocketIO from 'socket.io';
import {environment} from '../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {ChatDataModel, MessageModel} from './settings/chat/chat.component';

@Injectable()
export class SocketSharedService {
    socket: SocketIO.Socket;
    myId: any;
    private orderSubject = new BehaviorSubject<Object>(null);           // emits data when a new order is received
    public order$ = this.orderSubject.asObservable();

    private chatSubject = new BehaviorSubject<Array<ChatDataModel | ChatDataModel>>(null);
    public chat$ = this.chatSubject.asObservable();

    private messageSubject = new BehaviorSubject<MessageModel>(null);
    public message$ = this.messageSubject.asObservable();

    private closeChatSubject = new BehaviorSubject<Object>(null);
    public close$ = this.closeChatSubject.asObservable();


    constructor(private toastr: ToastrService) {
        const token = JSON.parse(localStorage.getItem('login'));
        if (token) {
            this.myId = token._id;
        }
    }

    public connectToSocketServer() {
        this.socket = io.connect(environment.apiEndPoint);
        this.socket.on('connect', () => {
            console.log('Socket connected');
            this.socket.emit('welcome', {});
        });
        this.socket.on('disconnect', () => {
            console.log('Socket disconnected');
        });
        this.emitNotification();
        this.newOrderNotification();
        this.orderStatusNotification();
        this.emitIdToGetChatList();
        this.getChatList();
        this.listenToIncomingMessages();
        this.listenToClosedChat();
    }

    // disconnects the socket
    public disconnectSocket() {
        this.socket.disconnect(true);
    }

    // emits event to get notification
    public emitNotification(body?): void {
        this.socket.emit('notification-list', body)
    }

    // this method is used to listen whenever a new order is being placed
    public newOrderNotification() {
        this.socket.on('newOrderPlaced', (data) => {
            if (Array.isArray(data) && data.length > 0) {
                this.orderSubject.next(data);
            } else if (!Array.isArray(data) && data) {
                this.orderSubject.next(data);
            }
        });
    }

    // this method get information from socket when the delivery boy accepts/rejects the order
    public orderStatusNotification() {
        this.socket.on('order-status-changed', (data) => {
            if (Notification.permission === 'granted') {
                new Notification('Order Info', {body: data.message, requireInteraction: true, icon: 'assets/img/logo-dark.png'});
            } else {
                this.toastr.info(data.message, 'Order info', {timeOut: 5000});
            }
            this.playAudio();
        });
    }

    // plays audio
    private playAudio(): void {
        const audio = new Audio('assets/bell.mp3');
        if (audio) {
            audio.play();
        }
    }

    // emits id to get all chat list
    public emitIdToGetChatList(): void {
        let body = {id: this.myId};
        this.socket.emit('get-chat-list', body);
    }

    // get's all chat list
    public getChatList(): void {
        this.socket.on(`chat-list${this.myId}`, (data) => {
            this.chatSubject.next(data);
        });
    }

    // sends message
    public sendsMessage(message: MessageModel) {
        this.socket.emit('send-message', message);
    }

    // listens to incoming messages
    public listenToIncomingMessages(): void {
        this.socket.on(`listen-new-messages${this.myId}`, (data) => {
            this.messageSubject.next(data);
        });
    }

    // listens to closed chat event
    public listenToClosedChat(): void {
        this.socket.on(`chat-closed${this.myId}`, (data) => {
            this.closeChatSubject.next(data);
        });
    }

    // userInfo(userId: any) {
    //     var data: any = {
    //         userId: ''
    //     };
    //     data.userId = userId;
    //     this.socket.emit('restaurantInfo', data);
    // }
    //
    // getMessages(Uid: any) {
    //     let observable = new Observable(observer => {
    //         this.socket.on('message' + Uid, (data) => {
    //             observer.next(data);
    //         });
    //     });
    //     return observable;
    // }
    //
    // updateCountUnReadMessage(user_id, seller_id) {
    //     this.socket.emit('updateSeller', {
    //         receiver_id: seller_id,
    //         sender_id: user_id
    //     });
    // }
    //
    // getCountNotification() {
    //     let observable = new Observable(observer => {
    //         this.socket.on('updatedCount' + this.myId, (data) => {
    //             observer.next(data);
    //         });
    //     });
    //     return observable;
    // }
    //
    // getUserNotification() {
    //     let observable = new Observable(observer => {
    //         this.socket.on('notify' + this.myId, (data) => {
    //             observer.next(data);
    //         });
    //     });
    //     return observable;
    // }
    //
    // getOrderNotification() {
    //     let observable = new Observable(observer => {
    //         this.socket.on('notify', (data) => {
    //             observer.next(data);
    //         });
    //     });
    //     return observable;
    // }
}
