import {Component, OnInit} from '@angular/core';
import {SocketSharedService} from '../../SocketShare.service';
import {UserInfoModel} from '../my-profile/my-profile.component';

export interface ChatDataModel {
    _id: string;
    user: UserInfoModel;
    store: string;
    status: string;
    messages: Array<MessageModel>;
    createdAt?: number;
    lastMessage: string;
    lastMessageTime: number;
    unread?: number;
}

export interface MessageModel {
    message: string;
    createdAt: number;
    user: string;
    store: string;
    sentBy: string;
    chatId?: string;
}

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    public chatList: Array<ChatDataModel> = [];   // contains the list of chat initialized
    public selectedChat: ChatDataModel;         // contains information about selected chat
    public messageData: MessageModel;           // contains information to send message

    constructor(private socketService: SocketSharedService) {
        // this.socketService.emitIdToGetChatList();
        // this.socketService.getChatList();
        // this.socketService.listenToIncomingMessages();
        // this.socketService.listenToClosedChat();
    }

    // get's default message data
    private getDefaultMessageData(): MessageModel {
        return {
            user: this.selectedChat.user._id,
            store: this.selectedChat.store,
            message: '',
            createdAt: null,
            sentBy: 'Store',
            chatId: this.selectedChat._id
        }
    }

    ngOnInit() {
        this.socketService.chat$.subscribe((chat: any) => {
            if (chat) {
                if (Array.isArray(chat)) {
                    this.chatList = chat;
                    if (this.chatList.length > 0) {
                        this.selectChat(this.chatList[0]);
                    } else {
                        this.selectedChat = undefined;
                    }
                } else {
                    const check = this.chatList.find(c => c._id === chat._id);
                    if (!check) {
                        this.chatList.push(chat);
                        if (this.chatList.length === 1) {
                            this.selectChat(this.chatList[0]);
                        }
                    }
                }
            }
        });
        this.socketService.message$.subscribe(message => {
            if (message) {
                if (message.chatId === this.selectedChat._id) {
                    this.selectedChat.messages.push(message);
                    this.selectedChat.lastMessageTime = message.createdAt;
                    this.selectedChat.lastMessage = message.message;
                } else {
                    const index = this.chatList.findIndex(chat => chat._id === message.chatId);
                    if (index !== -1) {
                        this.chatList[index].messages.push(message);
                        this.chatList[index].lastMessage = message.message
                        this.chatList[index].lastMessageTime = message.createdAt;
                    }
                }
            }
        });
        this.socketService.close$.subscribe((data: any) => {
            if (data) {
                const index = this.chatList.findIndex(chat => chat._id === data.chatId);
                if (index !== -1) {
                    this.chatList.splice(index, 1);
                    if (this.chatList.length > 0) {
                        this.selectedChat = this.chatList[0];
                    } else {
                        this.selectedChat = undefined;
                    }
                }
            }
        });
    }

    // sends message to user
    public sendMessage(): void {
        if (this.messageData.message.length === 0) {
            return;
        }
        this.messageData.createdAt = Date.now();
        this.socketService.sendsMessage(this.messageData);
        this.messageData = this.getDefaultMessageData();
    }

    // sets the selected chat as current active chat
    public selectChat(chat: ChatDataModel): void {
        this.selectedChat = chat;
        this.messageData = this.getDefaultMessageData();
    }

}
