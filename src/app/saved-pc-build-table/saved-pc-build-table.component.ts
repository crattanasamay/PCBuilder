import { PcBuild } from './../_classes/pc-build';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../_services/local-storage.service';
import { BuildPcDataSharedService } from '../_services/build-pc-data-shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-pc-build-table',
  templateUrl: './saved-pc-build-table.component.html',
  styleUrls: ['./saved-pc-build-table.component.scss']
})
export class SavedPcBuildTableComponent implements OnInit {

  pcBuilds: PcBuild[] = [];
  displayedColumns: string[] = ['date', 'pcCase', 'motherboard', 'cpu', 'gpu', 'ramMemory', 'hardDrive', 'ssdDrive', 'powerSupply', 'price', 'actions'];
  dataSource;


  totalPrice: number;
  constructor(public localStorageService: LocalStorageService, public builPcDataSharedService: BuildPcDataSharedService, public router: Router) {
    this.pcBuilds = [];
    this.pcBuilds = this.localStorageService.getAllPcBuilds();
    this.dataSource = this.pcBuilds;

  }

  ngOnInit(): void {
  }

  deletePcBuild(pcBuild: PcBuild) {
    this.localStorageService.deletePcBuild(pcBuild);

    // Update Table
    this.pcBuilds = this.localStorageService.getAllPcBuilds();
    this.dataSource = this.pcBuilds;
  }

  goToBuild(pcBuild: PcBuild) {
    this.builPcDataSharedService.setPcBuild(pcBuild);
    this.router.navigateByUrl('/build-pc');
  }

}
