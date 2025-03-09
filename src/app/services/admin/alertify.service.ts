import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  // message(message: string, messageType: MessageType, position: Position, delay: number = 5, dissmissOthers: boolean = false) {
   
  message(message: string, options: Partial<AlertifyOptions> ) {

    alertify.set('notifier','position', options.position);
    alertify.set('notifier','delay', options.delay);
    const msj = alertify[options.messageType](message);

    if (options.dissmissOthers) {
      msj.dissmissOthers(); //çalışmıyor 
    }
  }

  dismissAll() {
    alertify.dismissAll();
  }


}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.TopRight;
  delay: number = 3;
  dissmissOthers: boolean = false;
}

export enum MessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position {
  TopRight = "top-right",
  TopCenter = "top-center",
  TopLeft = "top-left",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center"
}
