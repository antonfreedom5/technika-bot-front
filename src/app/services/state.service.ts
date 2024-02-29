import {BehaviorSubject, Observable} from "rxjs";
import {MachineModel} from "../models/machine.model";

export class StateService {

  private machines = new BehaviorSubject<MachineModel[]>(null);
  private attachments = new BehaviorSubject<MachineModel[]>(null);

  public currentMachine = new BehaviorSubject<MachineModel>(null);
  public currentCategory = new BehaviorSubject<MachineModel>(null);
  public currentAttachment = new BehaviorSubject<MachineModel>(null);

  get machines$(): Observable<MachineModel[]> {
    return this.machines.asObservable();
  }

  setMachines = (machines: MachineModel[]): void => {
    this.machines.next(machines);
  }

  get currentMachine$(): Observable<MachineModel> {
    return this.currentMachine.asObservable();
  }

  setCurrentMachine = (machine: MachineModel): void => {
    this.currentMachine.next(machine);
  }

  get currentAttachment$(): Observable<MachineModel> {
    return this.currentAttachment.asObservable();
  }

  setCurrentCategory = (category: MachineModel): void => {
    this.currentCategory.next(category);
  }

  setCurrentAttachment = (attachment: MachineModel): void => {
    this.currentAttachment.next(attachment);
  }
}

