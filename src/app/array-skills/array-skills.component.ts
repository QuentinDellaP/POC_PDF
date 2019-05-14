import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SkillGraduated } from '../models/skillsSheet';

@Component({
  selector: 'app-array-skills',
  templateUrl: './array-skills.component.html',
  styleUrls: ['./array-skills.component.scss']
})
export class ArraySkillsComponent implements OnInit {

  @Input() displayedColumns: string[]; // names of columns to display
  @Input() dataSourceArray: any[]; // data array
  @Input() headerRowHidden: boolean; // is header row (columns title) hidden
  @Input() datatype: string; // 'skills' or 'softSkills'
  @Input() dataSource: MatTableDataSource<SkillGraduated[]>; // data as MatTableDataSource

  @Output() skillsEvent = new EventEmitter<SkillGraduated[]>() ;

  //Subscription ;
  skillsSubscription ;

  constructor() {
  }

  /**
   * Inits dataSource of array : skills or soft skills
   */
  ngOnInit() {
  }

}
