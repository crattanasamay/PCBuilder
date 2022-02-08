import { FilterDataSrouce } from './../_classes/FilterDataSource';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-filter-toolbar',
  templateUrl: './filter-toolbar.component.html',
  styleUrls: ['./filter-toolbar.component.scss']
})
export class FilterToolbarComponent {

  searchOn = false;

  private _dataSource: FilterDataSrouce;
  private _toolbarText:string;

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;

  @Input() set dataSource(value: FilterDataSrouce){
    this._dataSource = value;
    this.searchOn = false;
  }

  @Input() set  toolbarText(value:string){
    if(value){
      this._toolbarText = value;
    }else{
      this._toolbarText = "Filter for ..."
    }
  }

  get dataSource(): FilterDataSrouce {
    return this._dataSource;
  }
 
  @Input() filterOption:boolean;

  constructor() { }

  resetSearchInput() {
    if (this.searchOn) {
      this.searchOn = false;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter(filterValue.trim().toLowerCase());
  }
  search() {
    this.searchOn = true;
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 200);
  }

  searchOff() {
    this.applyFilter('');
    this.searchOn = false;
  }

}
