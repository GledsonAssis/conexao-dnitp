import flatpickr from 'flatpickr';
import { BaseOptions } from 'flatpickr/dist/types/options';

const Brazilian = require('flatpickr/dist/l10n/pt').default.pt;

class BRDateTimePicker {
  name: string;
  defaultDate: string
  component: HTMLElement;

  constructor(name: string, component: HTMLElement, defaultDate?: string) {
    this.name = name;
    this.component = component;
    this.defaultDate = defaultDate;
    // localization global
    flatpickr.localize(Brazilian);
    this._buildDateTimePicker();
    // this._buildDateTimePicker();
  }

  _setAttSelect() {
    this.component.setAttribute('br-datetimepicker-att', '');
  }

  _setDate(date: Date) {
    flatpickr(this.component).setDate(date)
  }

  _buildDateTimePicker() {
    let format = 'd/m/Y';
    let time = false;
    let noCalendar = false;
    switch (this.component.getAttribute('data-type')) {
      case 'date':
        format = 'd/m/Y';
        time = false;
        noCalendar = false;
        break;
      case 'time':
        format = 'H:i';
        time = true;
        noCalendar = true;
        break;
      case 'datetime-local':
        format = 'd/m/Y H:i';
        time = true;
        noCalendar = false;
        break;
      default:
        format = 'd/m/Y';
        time = false;
        noCalendar = false;
        break;
    }

    const config: Partial<BaseOptions> = {
      dateFormat: format,
      enableTime: time,
      // altInput: true,
      defaultDate: this.defaultDate,
      minDate: this.component.getAttribute('data-min-date'),
      maxDate: this.component.getAttribute('data-max-date'),
      minuteIncrement: 1,
      mode: this.component.getAttribute('data-mode') as "single" | "multiple" | "range" | "time",
      nextArrow: '<button class="br-button circle small" type="button"><i class="fas fa-angle-right"></i></button>',
      noCalendar,
      prevArrow: '<button class="br-button circle small" type="button"><i class="fas fas fa-angle-left"></i></button>',
      time_24hr: true,
      wrap: true,
      disableMobile: true,
    };

    flatpickr(this.component, config);
  }
}

// const datetimepickerList = []
// for (const brDateTimePicker of window.document.querySelectorAll(
//   '.br-datetimepicker'
// )) {
//   datetimepickerList.push(
//     new BRDateTimePicker('br-datetimepicker', brDateTimePicker)
//   )
// }

export default BRDateTimePicker;
