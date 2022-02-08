import { PCPart } from './pc-part';

export class PcBuild{
    id: string;
    dateSaved: Date;
    pcCase: PCPart;
    motherboard: PCPart;
    cpu: PCPart;
    gpu: PCPart;
    ramMemory: PCPart;
    hardDrive: PCPart;
    ssdDrive: PCPart;
    powerSupply: PCPart;
    totalPrice: number;
}