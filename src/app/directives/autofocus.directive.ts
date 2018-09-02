import { Directive, AfterViewInit, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer,
  ) { }

  public ngAfterViewInit(): void {
    this.renderer.invokeElementMethod(this.el.nativeElement, 'focus');
  }
}
