import {MachineModel} from "./machine.model";
import {UserModel} from "./user.model";

export interface OrderModel {
  place: string,
  phone: string,
  date: Date,
  machine: MachineModel,
  attachment: MachineModel,
  user: UserModel
}
