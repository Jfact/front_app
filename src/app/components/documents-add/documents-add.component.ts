import { ElementRef, Renderer2, ViewChildren, Component, OnInit } from '@angular/core';

import { LocalstorageService } from '../../services/localstorage.service';
import { QueryService } from '../../services/query.service';

import { GlobalVariables } from '../../shared/global-variables';

import { SlideInOutAnimation } from '../../animations';

@Component({
  selector: 'app-documents-add',
  templateUrl: './documents-add.component.html',
  styleUrls: ['./documents-add.component.scss'],
  animations: [ SlideInOutAnimation ]
})
export class DocumentsAddComponent implements OnInit {
  @ViewChildren("checkboxes") checkboxes: ElementRef;
  
  animationState = 'out';

  checkboxes_list : any = {};

  documents : any = [];
  storage : any = {};
  queryList : any = {};

  queryStatuses : any = GlobalVariables.QSTATUSES;

  constructor(private lss : LocalstorageService,
              private queryService : QueryService,
              private renderer: Renderer2) { }

  ngOnInit() {
    this.lss.getDocuments().subscribe(data => { this.documents = data; console.log(this.documents);  })
    
    this.lss.get().subscribe(data => {
      this.storage = data;
      
      this.queryService
        .get(this.storage.authentication_token)
        .subscribe(res => {this.queryList = res.reverse();})
    
    });
    
  }

  selectAll(checkbox){
    
    let _is_cheked : boolean
    
    if(checkbox != undefined)
      _is_cheked = checkbox.checked;
    
    if(this.checkboxes != undefined){
      this.checkboxes_list = this.checkboxes;
      this.checkboxes_list = this.checkboxes_list._results;
      
      if( _is_cheked )
        this.checkboxes_list.forEach(element => {
          element.nativeElement.checked = true;
          this.displayQueryList();
        });
      else
        this.checkboxes_list.forEach(element => {
          element.nativeElement.checked = false;
          this.displayQueryList();
        });
    }

  }

  selectSingle(){
    let decheck : boolean = false;
    let _first_checkbox : any = {};

    if(this.checkboxes != undefined){

      this.checkboxes_list = this.checkboxes;
      this.checkboxes_list = this.checkboxes_list._results;
           
           _first_checkbox = this.checkboxes
           _first_checkbox = _first_checkbox.first;


      this.checkboxes_list.forEach(element => {
        if(element.nativeElement.checked == false)
          decheck = true;
      });
      console.log(decheck)
      if(decheck)
        _first_checkbox.nativeElement.checked = false;
      else {_first_checkbox.nativeElement.checked = true; this.displayQueryList()}
    }
  }

  displayQueryList() {
    let _is_cheked : boolean = false;

    if(this.checkboxes != undefined){

      this.checkboxes_list = this.checkboxes;
      this.checkboxes_list = this.checkboxes_list._results;

      this.checkboxes_list.forEach(element => {
        if(element.nativeElement.checked == true)
          _is_cheked = true;
      });

    }

    if( _is_cheked ) this.animationState = 'in' 
      else this.animationState = 'out'

  }

}
