export interface MachineModel {
  id: number,
  name: string,
  imgUrl: string,
  attachments: MachineModel[],
  categories: MachineModel[]
}
