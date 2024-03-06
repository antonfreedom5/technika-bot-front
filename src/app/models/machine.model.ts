export interface MachineModel {
  id: number,
  name: string,
  imgUrl: string,
  price: number,
  attachments: MachineModel[],
  categories: MachineModel[]
}
