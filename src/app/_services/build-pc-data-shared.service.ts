import { PcBuild } from './../_classes/pc-build';
import { PcBuildCategory, PCPart } from './../_classes/pc-part';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildPcDataSharedService {

  private pcBuild: PcBuild;

  private pcCase = new Subject<PCPart>();
  sharedPcCase = this.pcCase.asObservable();

  private motherboard = new Subject<PCPart>();
  sharedMotherboard = this.motherboard.asObservable();

  private cpu = new Subject<PCPart>();
  sharedCpu = this.cpu.asObservable();

  private gpu = new Subject<PCPart>();
  sharedGpu = this.gpu.asObservable();

  private ramMemory = new Subject<PCPart>();
  sharedRamMemory = this.ramMemory.asObservable();

  private hardDrive = new Subject<PCPart>();
  sharedHardDrive = this.hardDrive.asObservable();

  private ssdDrive = new Subject<PCPart>();
  sharedSsdDrive = this.ssdDrive.asObservable();

  private powerSupply = new Subject<PCPart>();
  sharedPowerSupply = this.powerSupply.asObservable();

  private goToCategory = new Subject<PcBuildCategory>();
  sharedGoToCategory = this.goToCategory.asObservable();

  private deselectPcPartByCategory = new Subject<{ pcBuildCategory: PcBuildCategory, power: number }>();
  sharedDeselectPcPartByCategory = this.deselectPcPartByCategory.asObservable();

  private pcPartWhenRetrevingFromLS = new Subject<{ pcBuildCategory: PcBuildCategory, pcPart: PCPart }>();
  sharedPcPartWhenRetrevingFromLS = this.pcPartWhenRetrevingFromLS.asObservable();

  constructor() { }

  updatePcCase(newPart: PCPart) {
    this.pcCase.next(newPart);
  }

  updateMotherBoard(newPart: PCPart) {
    this.motherboard.next(newPart);
  }

  updateCpu(newPart: PCPart) {
    this.cpu.next(newPart);
  }

  updateGpu(newPart: PCPart) {
    this.gpu.next(newPart);
  }

  updateRamMemory(newPart: PCPart) {
    this.ramMemory.next(newPart);
  }

  updateHardDrive(newPart: PCPart) {
    this.hardDrive.next(newPart);
  }

  updateSSDDrive(newPart: PCPart) {
    this.ssdDrive.next(newPart);
  }

  updatePowerSupply(newPart: PCPart) {
    this.powerSupply.next(newPart);
  }

  updateGoToCategory(pcBuildCategory: PcBuildCategory) {
    this.goToCategory.next(pcBuildCategory);
  }

  updateDeselectPcPartByCategory(data:{ pcBuildCategory: PcBuildCategory, power: number }) {
    this.deselectPcPartByCategory.next(data);
  }

  updatePcPartWhenRetrevingFromLS(data: { pcBuildCategory: PcBuildCategory, pcPart: PCPart }) {
    this.pcPartWhenRetrevingFromLS.next(data);
  }

  setPcBuild(pcBuild: PcBuild) {
    this.pcBuild = pcBuild;
  }

  getPcBuild() {
    return this.pcBuild;
  }
}



