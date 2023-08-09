import { Component } from '@angular/core';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import maskitoOptions from '../mask';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  a = '';

  readonly options = maskitoOptions;

  readonly digitsOnlyMask: MaskitoOptions = {
    mask: /^\d+$/,
  };

  readonly timeMask: MaskitoOptions = {
    mask: [/\d/, /\d/, ':', /\d/, /\d/],
  };

  readonly predicate: MaskitoElementPredicateAsync = async (el) =>
    (el as HTMLIonInputElement).getInputElement();

  constructor() { }

  readonly uppercaseMask: MaskitoOptions = {
    mask: /^[a-zA-Z\s]+$/,
    postprocessors: [
      ({ value, selection }) => ({ value: value.toUpperCase(), selection }),
    ],
  };

  readonly numberMask: MaskitoOptions = {
    mask: /^\d+(,\d*)?$/,
    preprocessors: [
      ({ elementState, data }, actionType) => {
        const { value, selection } = elementState;

        return {
          elementState: {
            selection,
            value: value.replace('.', ','),
          },
          data: data.replace('.', ','),
        };
      },
    ],
  };
  setValue() {
    this.a = '123'
  }

}
