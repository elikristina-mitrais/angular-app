import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  @Output() close: EventEmitter<any> = new EventEmitter<any>();
  @Input() isShow: boolean | undefined;
  @Input() idxSelected: number | undefined;
  @Input() typeSelected: string | undefined;
  @Input() lists: any[] = [];

  hidePopup() {
    this.onClose(this.lists);
  }

  proceedConfirm() {
    if (this.idxSelected != undefined) {
      if (this.typeSelected === 'remove') {
        this.lists.splice(this.idxSelected, 1);
      } else if (this.typeSelected === 'update') {
        this.lists[this.idxSelected].status = 'Done';
      }
    }

    this.onClose(this.lists);
  }

  onClose(ev: any) {
    this.close.emit(ev);
  }
}
