import { PcBuild } from '../_classes/pc-build';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  savePcBuild(pcBuild: PcBuild) {

    let myStorage = window.localStorage;

    pcBuild.dateSaved = new Date();

    // Genreate unique Id by using uuid Library
    pcBuild.id = uuidv4();

    let alreadySavedPcBuilds: PcBuild[] = JSON.parse(myStorage.getItem("pcBuilds"));

    if (alreadySavedPcBuilds === null)
      alreadySavedPcBuilds = [];

    alreadySavedPcBuilds.push(pcBuild);
    myStorage.setItem("pcBuilds", JSON.stringify(alreadySavedPcBuilds));

    return true;
  }

  updatePcBuild(pcBuild: PcBuild) {
    
    let myStorage = window.localStorage;
    let alreadySavedPcBuilds: PcBuild[] = JSON.parse(myStorage.getItem("pcBuilds"));
    
    if (alreadySavedPcBuilds === null) {
      return;
    }

    let index = alreadySavedPcBuilds.findIndex(x => x.id = pcBuild.id);
    alreadySavedPcBuilds.splice(index, 1);

    alreadySavedPcBuilds.push(pcBuild);
    myStorage.setItem("pcBuilds", JSON.stringify(alreadySavedPcBuilds));

    return true;

  }

  getAllPcBuilds() {
    let myStorage = window.localStorage;
    let allPcBuilds: PcBuild[] = JSON.parse(myStorage.getItem("pcBuilds"));

    if (allPcBuilds === null) {
      return [];
    }

    return allPcBuilds;
  }

  deletePcBuild(pcBuild: PcBuild) {
    let myStorage = window.localStorage;
    let allPcBuilds: PcBuild[] = JSON.parse(myStorage.getItem("pcBuilds"));

    if (allPcBuilds === null) {
      return;
    }

    let index = allPcBuilds.findIndex(x => x.id = pcBuild.id);
    allPcBuilds.splice(index, 1);

    myStorage.setItem("pcBuilds", JSON.stringify(allPcBuilds));
  }


}
