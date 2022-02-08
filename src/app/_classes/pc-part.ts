


export interface IPCPart{
    id: number;
    hardware: string;
    name: string;
    price: number;
    sku: number;
    info: string;
    image: string;
    desc: string;
    power: number;
    pcie: string;
}

export class PCPart implements IPCPart{
    id: number;
    hardware: string;
    name: string;
    price: number;
    sku: number;
    info: string;
    image: string;
    desc: string;
    power: number;
    pcie: string;
}

export enum PcBuildCategory{
    PcCase = 0,
    Motherboard = 1,
    CPU = 2,
    GPU = 3,
    RAMMemory = 4,
    HardDrive = 5,
    SSDDrive = 6,
    PowerSupply = 7
  }
