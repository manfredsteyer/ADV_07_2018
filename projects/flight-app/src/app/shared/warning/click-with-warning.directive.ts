import { Directive, HostBinding, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[clickWithWarning]'
})
export class ClickWithWarningDirective {

  @Input() warning = 'Really?';
  @Output() clickWithWarning = new EventEmitter();

  @HostBinding('class') cssClass: string = 'btn btn-danger';

  @HostListener('click', ['$event'])
  handleClick($event): void {
    if (confirm(this.warning)) {
      this.clickWithWarning.emit();
    }
  }

  constructor() { }

}
