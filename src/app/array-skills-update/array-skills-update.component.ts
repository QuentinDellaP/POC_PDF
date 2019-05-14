import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-array-skills-update',
  templateUrl: './array-skills-update.component.html',
  styleUrls: ['./array-skills-update.component.scss']
})
export class ArraySkillsUpdateComponent implements OnInit {

  @Input() displayedColumns: string[]; // names of columns to display
  @Input() dataSource: MatTableDataSource<any[]>; // data array
  @Input() headerRowHidden: boolean; // is header row (columns title) hidden

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToSkillsSheetVersion(rowData) {
    this.router.navigate(['skills/skillsheet/' + rowData['name'] + '/' + rowData['versionNumber']]);
  }

}
