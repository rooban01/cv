import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
   selector: 'app-selector-component',
   templateUrl: './selector.component.html',
   styleUrls: ['./selector.component.css']
})
export class SelectorComponent{
  panelColor = new FormControl('red');
}
