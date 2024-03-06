import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MachineModel } from "../../models/machine.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() item: MachineModel;
  @Input() includePrice = true;

  @Output() onClick = new EventEmitter<MachineModel>();
}
