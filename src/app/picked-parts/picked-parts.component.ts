import { LocalStorageService } from '../_services/local-storage.service';
import { PcBuild } from './../_classes/pc-build';
import { PcPartMoreDetailDialogComponent } from './../pc-part-more-detail-dialog/pc-part-more-detail-dialog.component';
import { PcBuildCategory, PCPart } from './../_classes/pc-part';
import { BuildPcDataSharedService } from './../_services/build-pc-data-shared.service';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PickPartComponent } from '../pick-part/pick-part.component';
import { TempDatabaseService } from '../_services/temp-database.service';


@Component({
  selector: 'app-picked-parts',
  templateUrl: './picked-parts.component.html',
  styleUrls: ['./picked-parts.component.scss']
})
export class PickedPartsComponent implements OnInit, OnDestroy {


  pcCase: PCPart;
  motherboard: PCPart;
  cpu: PCPart;
  gpu: PCPart;
  ramMemory: PCPart;
  hardDrive: PCPart;
  ssdDrive: PCPart;
  powerSupply: PCPart;

  totalPrice: number;
  totalPower: number;

  subs: Subscription[];
  partsDisplay: { iconSrc: string, pcPart: PCPart }[];

  pcBuildCategory = PcBuildCategory;
  pcBuild: PcBuild;

  constructor(public builPcDataSharedService: BuildPcDataSharedService, public dialog: MatDialog,
              public localStorageService: LocalStorageService, public snackBar: MatSnackBar,
              public tempDataBase: TempDatabaseService) {

    this.totalPrice = 0;
    this.totalPower = 0;
    this.subs = [];
  }

  ngOnInit(): void {
    // Create array of all subscription to be unsubscribed at the end of component life
    this.subs.push(this.builPcDataSharedService.sharedPcCase.subscribe(next => {

      if (this.pcCase != null) {
        this.totalPrice -= this.pcCase.price;
      }

      this.pcCase = next;
      this.totalPrice += this.pcCase.price;
    }));

    this.subs.push(this.builPcDataSharedService.sharedMotherboard.subscribe(next => {

      if (this.motherboard != null) {
        this.totalPrice -= this.motherboard.price;
      }

      this.motherboard = next;
      this.totalPrice += this.motherboard.price;
    }));

    this.subs.push(this.builPcDataSharedService.sharedCpu.subscribe(next => {
      if (this.cpu != null) {
        this.totalPrice -= this.cpu.price;
        this.totalPower -= Number(this.cpu.power);
      }

      this.cpu = next;
      this.totalPrice += this.cpu.price;
      this.totalPower += Number(this.cpu.power);
    }));

    this.subs.push(this.builPcDataSharedService.sharedGpu.subscribe(next => {
      if (this.gpu != null) {
        this.totalPrice -= this.gpu.price;
        this.totalPower -= Number(this.gpu.power);
      }

      this.gpu = next;
      this.totalPrice += this.gpu.price;
      this.totalPower += Number(this.gpu.power);
    }));

    this.subs.push(this.builPcDataSharedService.sharedRamMemory.subscribe(next => {
      if (this.ramMemory != null) {
        this.totalPrice -= this.ramMemory.price;
      }

      this.ramMemory = next;
      this.totalPrice += this.ramMemory.price;
    }));

    this.subs.push(this.builPcDataSharedService.sharedHardDrive.subscribe(next => {
      if (this.hardDrive != null) {
        this.totalPrice -= this.hardDrive.price;
      }

      this.hardDrive = next;
      this.totalPrice += this.hardDrive.price;
    }));

    this.subs.push(this.builPcDataSharedService.sharedSsdDrive.subscribe(next => {
      if (this.ssdDrive != null) {
        this.totalPrice -= this.ssdDrive.price;
      }

      this.ssdDrive = next;
      this.totalPrice += this.ssdDrive.price;
    }));

    this.subs.push(this.builPcDataSharedService.sharedPowerSupply.subscribe(next => {
      if (this.powerSupply != null) {
        this.totalPrice -= this.powerSupply.price;
      }

      this.powerSupply = next;
      this.totalPrice += this.powerSupply.price;
    }));

    // Check whether there is pcBuild in builPcDataSharedService
    if (this.builPcDataSharedService.getPcBuild()) {
      this.pcBuild = this.builPcDataSharedService.getPcBuild();
      this.populatePcBuild();
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }

  moreDetails(pcPart: PCPart): void {
    const dialogRef = this.dialog.open(PcPartMoreDetailDialogComponent, {
      width: '400px',
      data: pcPart
    });
    return;
  }


  goToCategory(category: PcBuildCategory, pcPartId: number): void {
    this.builPcDataSharedService.updateGoToCategory(category);
  }

  saveBuild(): void {
    const pcBuild = new PcBuild();
    pcBuild.pcCase = this.pcCase;
    pcBuild.motherboard = this.motherboard;
    pcBuild.cpu = this.cpu;
    pcBuild.gpu = this.gpu;
    pcBuild.ramMemory = this.ramMemory;
    pcBuild.hardDrive = this.hardDrive;
    pcBuild.ssdDrive = this.ssdDrive;
    pcBuild.powerSupply = this.powerSupply;
    pcBuild.totalPrice = this.totalPrice;

    if (this.localStorageService.savePcBuild(pcBuild)) {
      this.pcBuild = pcBuild;

      this.snackBar.open('PC Build was saved successfully', 'OK', {
        duration: 2000,
      });
    }
  }

  saveUpdate(): void {

    const pcBuild = new PcBuild();
    pcBuild.pcCase = this.pcCase;
    pcBuild.motherboard = this.motherboard;
    pcBuild.cpu = this.cpu;
    pcBuild.gpu = this.gpu;
    pcBuild.ramMemory = this.ramMemory;
    pcBuild.hardDrive = this.hardDrive;
    pcBuild.ssdDrive = this.ssdDrive;
    pcBuild.powerSupply = this.powerSupply;
    pcBuild.totalPrice = this.totalPrice;
    pcBuild.dateSaved = this.pcBuild.dateSaved;
    pcBuild.id = this.pcBuild.id;

    if (this.localStorageService.updatePcBuild(pcBuild)) {

      this.snackBar.open('Update was successfully', 'OK', {
        duration: 2000,
      });

    }
  }

  atLeastOneSelceted(): boolean {
    if (this.pcCase || this.motherboard || this.cpu || this.gpu || this.ramMemory || this.hardDrive || this.ssdDrive || this.powerSupply) {
      return true;
    }
    else {
      return false;
    }
  }

  deselect(partOfCategory: PcBuildCategory): void {
    let updatePower = false
    switch (partOfCategory) {
      case PcBuildCategory.PcCase: {
        this.totalPrice -= this.pcCase.price;
        this.pcCase = null;
        break;
      }
      case PcBuildCategory.Motherboard: {
        this.totalPrice -= this.motherboard.price;
        this.motherboard = null;
        break;
      }
      case PcBuildCategory.CPU: {
        this.totalPrice -= this.cpu.price;
        this.totalPower -= Number(this.cpu.power);
        this.cpu = null;
        updatePower = true;
        break;
      }
      case PcBuildCategory.GPU: {
        this.totalPrice -= this.gpu.price;
        this.totalPower -= Number(this.gpu.power);
        this.gpu = null;
        updatePower = true;
        break;
      }
      case PcBuildCategory.RAMMemory: {
        this.totalPrice -= this.ramMemory.price;
        this.ramMemory = null;
        break;
      }
      case PcBuildCategory.HardDrive: {
        this.totalPrice -= this.hardDrive.price;
        this.hardDrive = null;
        break;
      }
      case PcBuildCategory.SSDDrive: {
        this.totalPrice -= this.ssdDrive.price;
        this.ssdDrive = null;
        break;
      }
      case PcBuildCategory.PowerSupply: {
        this.totalPrice -= this.powerSupply.price;
        this.powerSupply = null;
        break;
      }
      default: {
        break;
      }
    }

    // Deselect part in pc picker
    this.builPcDataSharedService.updateDeselectPcPartByCategory({pcBuildCategory:partOfCategory, power: updatePower ? this.totalPower : -1});
  }

  populatePcBuild(): void {
    const pcBuild = this.builPcDataSharedService.getPcBuild();

    if (pcBuild.pcCase) {
      this.builPcDataSharedService.updatePcCase(pcBuild.pcCase);
      this.builPcDataSharedService.updatePcPartWhenRetrevingFromLS({ pcBuildCategory: PcBuildCategory.PcCase, pcPart:  pcBuild.pcCase});
    }

    if (pcBuild.motherboard) {
      this.builPcDataSharedService.updateMotherBoard(pcBuild.motherboard);
      this.builPcDataSharedService.updatePcPartWhenRetrevingFromLS({
        pcBuildCategory: PcBuildCategory.Motherboard, pcPart:  pcBuild.motherboard});
    }

    if (pcBuild.cpu) {
      this.builPcDataSharedService.updateCpu(pcBuild.cpu);
      this.builPcDataSharedService.updatePcPartWhenRetrevingFromLS({ pcBuildCategory: PcBuildCategory.CPU, pcPart:  pcBuild.cpu});
    }

    if (pcBuild.gpu) {
      this.builPcDataSharedService.updateGpu(pcBuild.gpu);
      this.builPcDataSharedService.updatePcPartWhenRetrevingFromLS({ pcBuildCategory: PcBuildCategory.GPU, pcPart:  pcBuild.gpu});
    }

    if (pcBuild.ramMemory) {
      this.builPcDataSharedService.updateRamMemory(pcBuild.ramMemory);
      this.builPcDataSharedService.updatePcPartWhenRetrevingFromLS({
        pcBuildCategory: PcBuildCategory.RAMMemory, pcPart:  pcBuild.ramMemory});
    }

    if (pcBuild.hardDrive) {
      this.builPcDataSharedService.updateHardDrive(pcBuild.hardDrive);
      this.builPcDataSharedService.updatePcPartWhenRetrevingFromLS({
        pcBuildCategory: PcBuildCategory.HardDrive, pcPart:  pcBuild.hardDrive});
    }

    if (pcBuild.ssdDrive) {
      this.builPcDataSharedService.updateSSDDrive(pcBuild.ssdDrive);
      this.builPcDataSharedService.updatePcPartWhenRetrevingFromLS({ pcBuildCategory: PcBuildCategory.SSDDrive, pcPart:  pcBuild.ssdDrive});
    }

    if (pcBuild.powerSupply) {
      this.builPcDataSharedService.updatePowerSupply(pcBuild.powerSupply);
      this.builPcDataSharedService.updatePcPartWhenRetrevingFromLS({
        pcBuildCategory: PcBuildCategory.PowerSupply, pcPart:  pcBuild.powerSupply});
    }

    this.totalPrice = pcBuild.totalPrice;

    // Set pcBuild in service to NULL because it was used only to pass into this component once
    this.builPcDataSharedService.setPcBuild(null);
  }



}
