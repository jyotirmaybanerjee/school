declare type Notification = {
    type: string;
    message: string;
};

declare type NotificationState = {
    notifications: Array<Notification>
}
