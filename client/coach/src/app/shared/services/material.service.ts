import {ElementRef} from "@angular/core";

declare var M;
export interface MaterialInstance {
  open?(): void
  close?(): void
  destroy?(): void
  onOpenStart?(): void
}

export interface MaterialDatepicker extends MaterialInstance {
  date?: Date
  setDate?(): void
}

export class MaterialService {
  static toast(message: string) {
    M.toast({html: message});
  }

  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static updateTextInputs() {
    M.updateTextFields();
  }

  static textareaAutoResize(ref: ElementRef) {
    M.textareaAutoResize(ref.nativeElement);
  }
  

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }

  static initTooltip(ref: ElementRef): MaterialInstance {
    return  M.Tooltip.init(ref.nativeElement);
  }
  static initAccordion(ref: ElementRef, onOpenStart?: () => void) {
    M.Collapsible.init(ref.nativeElement, {onOpenStart});
  }

  static initAutocomplete(ref: ElementRef, options?) {
    M.Autocomplete.init(ref.nativeElement, options);
  }
  
  static initDatepicker(ref: ElementRef): MaterialDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true
    })
  }

  static initTapTarget(ref: ElementRef): MaterialInstance {
    return M.TapTarget.init(ref.nativeElement)
  }
}
