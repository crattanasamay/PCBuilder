import { PCPart, IPCPart } from './../_classes/pc-part';
import { Injectable } from '@angular/core';
import { ResolvedStaticSymbol } from '@angular/compiler';
import { ApiService } from '../_services/api.service';


@Injectable({
  providedIn: 'root'
})
export class TempDatabaseService {

  private arr: IPCPart[];
  private CaseArr: IPCPart[];
  private GPUArr: IPCPart[];
  private CPUArr: IPCPart[];
  private MemoryArr: IPCPart[];
  private HardDriveArr: IPCPart[];
  private SSDArr: IPCPart[];
  private PowerSupplyArr: IPCPart[];
  private MotherboardArr: IPCPart[];


  constructor(public apiService: ApiService) {

    this.apiService.readSql().subscribe((pcparts: IPCPart[]) => {
      this.arr = pcparts;

      this.CaseArr = this.arr.filter(e => e.hardware.includes('Desktop Case'));
      this.CPUArr = this.arr.filter(e => e.hardware.includes('CPU'));
      this.GPUArr = this.arr.filter(e => e.hardware.includes('Graphics Card'));
      this.MotherboardArr = this.arr.filter(e => e.hardware.includes('Motherboard'));
      this.PowerSupplyArr = this.arr.filter(e => e.hardware.includes('Power Supply Unit'));
      this.MemoryArr = this.arr.filter(e => e.hardware.includes('Memory'));
      this.HardDriveArr = this.arr.filter(e => e.hardware.includes('Hard Drive'));
      this.SSDArr = this.arr.filter(e => e.hardware.includes('Solid State Drive'));

      console.log(this.arr);
    });

   }

  getPCCases(): IPCPart[]{
    return this.CaseArr;
  }

  getGPUs(): IPCPart[]{
    return this.GPUArr;
  }

  getCPUs(): IPCPart[]{
    return this.CPUArr;
  }

  getRamMemories(): IPCPart[]{
    return this.MemoryArr;
  }

  getHardDrives(): IPCPart[]{
    return this.HardDriveArr;
  }

  getSSDs(): IPCPart[]{
    return this.SSDArr;
  }

  getPowerSupplies(): IPCPart[]{
    return this.PowerSupplyArr;
  }

  getMotherboards(): IPCPart[]{
    return this.MotherboardArr;
  }
}
