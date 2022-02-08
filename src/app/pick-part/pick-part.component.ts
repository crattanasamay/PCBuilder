import { FilterDataSrouce } from './../_classes/FilterDataSource';
import { TempDatabaseService } from './../_services/temp-database.service';
import { PCPart, IPCPart, PcBuildCategory } from './../_classes/pc-part';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BuildPcDataSharedService } from '../_services/build-pc-data-shared.service';
import { ApiService } from '../_services/api.service';

let updatePowerHasBeenCalled: boolean;

@Component({
  selector: 'app-pick-part',
  templateUrl: './pick-part.component.html',
  styleUrls: ['./pick-part.component.scss']
})

export class PickPartComponent implements OnInit, OnDestroy {

  currentPcPartPickerOptionIndex: number;
  currentPcPartBeingPicked: string;

  currentPcParts: PCPart[];
  filterDataSource: FilterDataSrouce;
  pcPartOptions: string[];

  isPcPartSelcted: boolean;
  pcPartSelectedId: number;

  dataLoaded: boolean;
  socket: IPCPart[];
  compatibleSocket: string;
  cpuID: number;
  gpuID: number;
  moboID: number;
  totalPower: number;
  tempPower: number;
  pcieSlot: string;

  goToCategorySub: any;
  deselectPcPartByCategorySub: any;
  pcPartWhenRetrevingFromLSSub: any;

  pcBuildCategory = PcBuildCategory;


  constructor(public tempDatabase: TempDatabaseService, public builPcDataSharedService: BuildPcDataSharedService) {

    this.pcPartOptions = ['PC Case', 'Motherboard', 'CPU', 'GPU', 'RAM Memory', 'Hard Drive', 'SSD Drive', 'Power Supply'];
    this.currentPcParts = [];
    this.currentPcPartPickerOptionIndex = 0;
    this.currentPcPartBeingPicked = this.pcPartOptions[0];
    this.isPcPartSelcted = false;
    this.pcPartSelectedId = -1;
    this.totalPower = 0;
    this.tempPower = 0;
    this.dataLoaded = false;
    updatePowerHasBeenCalled = false;

    this.goToCategorySub = builPcDataSharedService.sharedGoToCategory.subscribe(next => {
      this.currentPcPartPickerOptionIndex = next;
      this.currentPcPartBeingPicked = this.pcPartOptions[this.currentPcPartPickerOptionIndex];

      // Check whether the might have been picked for given category
      if (this.currentPcParts[this.currentPcPartPickerOptionIndex]) {
        this.pcPartSelectedId = this.currentPcParts[this.currentPcPartPickerOptionIndex].id;
        this.isPcPartSelcted = true;
      } else {
        this.isPcPartSelcted = false;
        this.pcPartSelectedId = -1;
      }
      if (this.currentPcPartBeingPicked === 'CPU') {
        const moboTemp = this.tempDatabase.getMotherboards().filter(e => e.id === this.moboID);
        this.compatibleSocket = moboTemp[0].info;
        this.pcieSlot = moboTemp[0].pcie;
        if (this.pcieSlot.includes('x16')) {this.pcieSlot = 'x16'; }
      }
      if (this.currentPcPartBeingPicked === 'Power Supply') {
        if (updatePowerHasBeenCalled) {
          this.totalPower = this.tempPower;
          updatePowerHasBeenCalled = false;
        }
        else {
          this.getPower();
        }
      }

      this.updateCurrentPcParts();
    });

    this.deselectPcPartByCategorySub = builPcDataSharedService.sharedDeselectPcPartByCategory.subscribe(next => {
      this.currentPcParts[next.pcBuildCategory] = null;
      if(next.power >= 0){
        this.totalPower = next.power;
        this.updateCurrentPcParts();
      }
    });

    this.pcPartWhenRetrevingFromLSSub = builPcDataSharedService.sharedPcPartWhenRetrevingFromLS.subscribe(next => {
      this.currentPcParts[next.pcBuildCategory] = next.pcPart;
      this.currentPcPartPickerOptionIndex = next.pcBuildCategory;

      this.currentPcPartBeingPicked = this.pcPartOptions[next.pcBuildCategory];

      if (this.currentPcPartBeingPicked === 'CPU') {this.cpuID = next.pcPart.id; }
      if (this.currentPcPartBeingPicked === 'GPU') {this.gpuID = next.pcPart.id; }
      if (this.currentPcPartBeingPicked === 'Motherboard') {this.moboID = next.pcPart.id; }

      if (this.currentPcPartBeingPicked === 'CPU') {
        const moboTemp = this.tempDatabase.getMotherboards().filter(e => e.id === this.moboID);
        this.compatibleSocket = moboTemp[0].info;
        this.pcieSlot = moboTemp[0].pcie;
        if (this.pcieSlot.includes('x16')) {this.pcieSlot = 'x16'; }
      }
      if (this.currentPcPartBeingPicked === 'Power Supply') {
        if (updatePowerHasBeenCalled) {
          this.totalPower = this.tempPower;
          updatePowerHasBeenCalled = false;
        }
        else {
          this.getPower();
        }
      }

      this.updateCurrentPcParts();
      this.isPcPartSelcted = true;
      this.dataLoaded = true;
    });

  }
  ngOnDestroy(): void {
    if (this.goToCategorySub) {
      this.goToCategorySub.unsubscribe();
    }

    if (this.deselectPcPartByCategorySub) {
      this.deselectPcPartByCategorySub.unsubscribe();
    }

    if (this.pcPartWhenRetrevingFromLSSub) {
      this.pcPartWhenRetrevingFromLSSub.unsubscribe();
    }
  }

  ngOnInit(): void {
    if (!this.filterDataSource) {
      setTimeout(() => {
        const tempPcCase = this.tempDatabase.getPCCases();
        this.filterDataSource = new FilterDataSrouce(tempPcCase);
        this.dataLoaded = true;
      }, 500);
    }


  }

  public getPower(): void {
    const gpuTemp = this.tempDatabase.getGPUs().filter(e => e.id === this.gpuID);
    const cpuTemp = this.tempDatabase.getCPUs().filter(e => e.id === this.cpuID);
    this.totalPower = Number(gpuTemp[0].power) + Number(cpuTemp[0].power);
    console.log(this.totalPower);
  }

  selectPcPart(pcPart: PCPart): void {
    this.pcPartSelectedId = pcPart.id;
    this.isPcPartSelcted = true;
    if (this.currentPcPartBeingPicked === 'CPU') {this.cpuID = pcPart.id; }
    if (this.currentPcPartBeingPicked === 'GPU') {this.gpuID = pcPart.id; }
    if (this.currentPcPartBeingPicked === 'Motherboard') {this.moboID = pcPart.id; }

    this.currentPcParts[this.currentPcPartPickerOptionIndex] = pcPart;

    this.updatePickedPartsComponent(pcPart);
  }

  next(): void {
    this.currentPcPartPickerOptionIndex++;


    // Check whether the might have been picked for given category
    if (this.currentPcParts[this.currentPcPartPickerOptionIndex]) {
      this.pcPartSelectedId = this.currentPcParts[this.currentPcPartPickerOptionIndex].id;
      this.isPcPartSelcted = true;
    } else {
      this.isPcPartSelcted = false;
      this.pcPartSelectedId = -1;
    }

    this.currentPcPartBeingPicked = this.pcPartOptions[this.currentPcPartPickerOptionIndex];
    if (this.currentPcPartBeingPicked === 'CPU') {
      const moboTemp = this.tempDatabase.getMotherboards().filter(e => e.id === this.moboID);
      this.compatibleSocket = moboTemp[0].info;
      this.pcieSlot = moboTemp[0].pcie;
      if (this.pcieSlot.includes('x16')) {this.pcieSlot = 'x16'; }
    }
    if (this.currentPcPartBeingPicked === 'Power Supply') {
      if (updatePowerHasBeenCalled) {
        this.totalPower = this.tempPower;
        updatePowerHasBeenCalled = false;
      }
      else {
        this.getPower();
      }
    }
    this.updateCurrentPcParts();

  }

  previous(): void {
    this.currentPcPartPickerOptionIndex--;

    // Check whether the might have been picked for given category
    if (this.currentPcParts[this.currentPcPartPickerOptionIndex]) {
      this.pcPartSelectedId = this.currentPcParts[this.currentPcPartPickerOptionIndex].id;
      this.isPcPartSelcted = true;
    } else {
      this.isPcPartSelcted = false;
      this.pcPartSelectedId = -1;
    }

    this.currentPcPartBeingPicked = this.pcPartOptions[this.currentPcPartPickerOptionIndex];
    this.updateCurrentPcParts();
  }

  updateCurrentPcParts(): void {
    debugger
    switch (this.currentPcPartPickerOptionIndex) {
      case PcBuildCategory.PcCase: {
        this.filterDataSource = new FilterDataSrouce(this.tempDatabase.getPCCases());
        break;
      }
      case PcBuildCategory.Motherboard: {
        this.filterDataSource = new FilterDataSrouce(this.tempDatabase.getMotherboards());
        break;
      }
      case PcBuildCategory.CPU: {
        const compatibleCPUs = this.tempDatabase.getCPUs().filter(e => e.info === this.compatibleSocket);
        this.filterDataSource = new FilterDataSrouce(compatibleCPUs);
        break;
      }
      case PcBuildCategory.GPU: {
        const compatibleGPUs = this.tempDatabase.getGPUs().filter(e => e.pcie.includes(this.pcieSlot));
        this.filterDataSource = new FilterDataSrouce(compatibleGPUs);
        break;
      }
      case PcBuildCategory.RAMMemory: {
        this.filterDataSource = new FilterDataSrouce(this.tempDatabase.getRamMemories());
        break;
      }
      case PcBuildCategory.HardDrive: {
        this.filterDataSource = new FilterDataSrouce(this.tempDatabase.getHardDrives());
        break;
      }
      case PcBuildCategory.SSDDrive: {
        this.filterDataSource = new FilterDataSrouce(this.tempDatabase.getSSDs());
        break;
      }
      case PcBuildCategory.PowerSupply: {
        const compatiblePSUs = this.tempDatabase.getPowerSupplies().filter(
          e => parseInt(e.info.substr(0, e.info.indexOf(' ')), 10) >= this.totalPower);

        this.filterDataSource = new FilterDataSrouce(compatiblePSUs);
        break;
      }
      default: {
        break;
      }
    }
  }

  updatePickedPartsComponent(pcPart: PCPart): void {

    switch (this.currentPcPartPickerOptionIndex) {

      case PcBuildCategory.PcCase: {
        this.builPcDataSharedService.updatePcCase(pcPart);
        break;
      }
      case PcBuildCategory.Motherboard: {
        this.builPcDataSharedService.updateMotherBoard(pcPart);
        break;
      }
      case PcBuildCategory.CPU: {
        this.builPcDataSharedService.updateCpu(pcPart);
        break;
      }
      case PcBuildCategory.GPU: {
        this.builPcDataSharedService.updateGpu(pcPart);
        break;
      }
      case PcBuildCategory.RAMMemory: {
        this.builPcDataSharedService.updateRamMemory(pcPart);
        break;
      }
      case PcBuildCategory.HardDrive: {
        this.builPcDataSharedService.updateHardDrive(pcPart);
        break;
      }
      case PcBuildCategory.SSDDrive: {
        this.builPcDataSharedService.updateSSDDrive(pcPart);
        break;
      }
      case PcBuildCategory.PowerSupply: {
        this.builPcDataSharedService.updatePowerSupply(pcPart);
        break;
      }
      default: {
        break;
      }
    }
  }

  updateUrlForNotFoundImage(pcPart: PCPart): void {
    console.log(pcPart);
    pcPart.image = '../../assets/icons/error-404.svg';
  }

}



