import { Component, ComponentFactoryResolver, ViewContainerRef, ViewChild, ComponentRef, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SkillGraduated, SkillsSheet, Skill } from '../models/skillsSheet';
import { Person, PersonRole } from '../models/person';
import { Chart } from 'chart.js';
import { Skills } from '../models/skills';
import { TestComponentComponent } from '../test-component/test-component.component'

@Component({
  selector: 'app-skills-forms',
  templateUrl: './skills-forms.component.html',
  styleUrls: ['./skills-forms.component.scss']
})
export class SkillsFormsComponent implements OnInit {

  versionsArray = new MatTableDataSource();
  lastModifDisplayedColumns: string[] = ['manager', 'date'];

  //Information of tech skills
  skillsArray: any[] = [];
  skillsDisplayedColumns: string[] = ['skillName', 'grade'];
  skillsArrayDataSource = new MatTableDataSource<SkillGraduated[]>() ;

  //Information of soft skills
  softSkillsArray: any[] = [];
  softSkillsDisplayedColumns: string[] = ['skillName', 'grade'];
  softSkillsArrayDataSource = new MatTableDataSource<SkillGraduated[]>() ;

  headerRowHiddenModif = false;
  headerRowHiddenSkills = true;

  //Form displayed
  formItems: any[];

  //Charts
  skillsChart = Chart;
  softSkillsChart = Chart;

  currentPerson: Person;
  tmpCurrentPerson: Person;
  currentSkillsSheet: SkillsSheet;

  //MODIF DETECTION
  countSkillsUpdate = 0;
  countSoftSkillsUpdate = 0;
  modifDetection: boolean = false;

  //information contains in the path
  name: string;
  version: number;

  //
  avis: string;
  isEditButtonHidden: boolean = false;
  isPersonDataDisabled: boolean = true;
  isSkillsSheetNameEditable: boolean = false;

  //subscription
  submenusSubscription;
  skillsSubscription;

  //Name of the skillsSheet
  nameSkillsSheet: string;

  //picture
  picture = false; 

  @ViewChild('headerHost', { read: ViewContainerRef }) entry: ViewContainerRef;
  componentRef: any ;

  constructor(private componentFactoryResolver: ComponentFactoryResolver){

  }

  ngOnInit() {
    //if we are consultant or applicant we don't have the same information so we load the form that match with the role
    let formItemsJSON = require('../resources/formItems.json');
    this.formItems = formItemsJSON["candidateFormItems"];
    this.initializeView(); 
  }

  initializeView(){
    this.currentPerson = new Person("Maxime","Maquinghen","maxime.maquinghen@gmail.com",PersonRole.APPLICANT) ; 
    this.currentSkillsSheet = new SkillsSheet("TEST 1",this.currentPerson) ; 
    for(let i = 0 ; i < 8 ; i++){
      let name:string = ""+i ; 
      let grade = 1 ; 
      let isSoft ;
      if(i%2 == 0){
        isSoft = "" ;
      }
      let skill = new Skill(name) ; 
      if(isSoft == ""){
        skill.isSoft = isSoft ; 
      }
      this.currentSkillsSheet.skillsList.push(new SkillGraduated(skill,grade)); 
    }
    let skills = new Skills(this.currentPerson,this.currentSkillsSheet) ; 
    this.softSkillsArray = [];
      this.skillsArray = [];
      skills.skillsSheet.skillsList.forEach(skill => {
        if (skill['skill'].hasOwnProperty('isSoft')) {
          this.softSkillsArray.push(skill);
        } else {
          this.skillsArray.push(skill)
        }
      });
      this.countSkillsUpdate = 0;
      this.countSoftSkillsUpdate = 0;
      this.modifDetection = false;
      this.skillsArrayDataSource = new MatTableDataSource(this.skillsArray) ;
      this.updateChartSkills(this.skillsArray) ;
      this.softSkillsArrayDataSource = new MatTableDataSource(this.softSkillsArray) ;
      this.updateChartSoftSkills(this.softSkillsArray) ;
  }

  /**
   * Translates Person role
   * @param  roleName role to translate
   */
  translate(roleName) {
    return roleName.toLowerCase() === 'applicant' ? 'Candidat' : 'Consultant';
  }

  savePDF(){
    window.open('/test', "_blank")
  }



  /***********************************************************************\
   *
   *                          CHART FUNCTIONS
   *
  \***********************************************************************/

  /**
   * Updates the radar chart for skills
   * @param  arraySkills Array containing updated skills
   */
  updateChartSkills(arraySkills: SkillGraduated[]) {
    if (this.countSkillsUpdate > 1) {
      this.modifDetection = true;
    }
    this.countSkillsUpdate++;
    if (typeof this.skillsChart != "function") {
      this.skillsChart.destroy();
    }
    if (arraySkills.length != 0) {
      let skillsLabels: string[] = [];
      let skillsData: number[] = [];
      arraySkills.forEach(function (skillGraduated) {
        skillsLabels.push(skillGraduated.skill.name);
        skillsData.push(skillGraduated.grade);
      });
      this.skillsChart = this.createOrUpdateChart(this.formatLabels(skillsLabels, 8), skillsData, 'canvasSkills');
      this.skillsArray = arraySkills;
      this.currentSkillsSheet.skillsList = this.skillsArray.concat(this.softSkillsArray);
    }
  }

  /**
   * Updates the radar chart for soft skills
   * @param  arraySkills Array containing updated soft skills
   */
  updateChartSoftSkills(arraySoftSkills: SkillGraduated[]) {
    if (this.countSoftSkillsUpdate > 1) {
      this.modifDetection = true;
    }
    this.countSoftSkillsUpdate++;
    if (typeof this.softSkillsChart != "function") {
      this.softSkillsChart.destroy();
    }
    if (arraySoftSkills.length != 0) {
      let skillsLabels: string[] = [];
      let skillsData: number[] = [];
      arraySoftSkills.forEach(function (skillGraduated) {
        skillsLabels.push(skillGraduated.skill.name);
        skillsData.push(skillGraduated.grade);
      });
      this.softSkillsChart = this.createOrUpdateChart(this.formatLabels(skillsLabels, 8), skillsData, 'canvasSoftSkills');
      this.softSkillsArray = arraySoftSkills;
      this.currentSkillsSheet.skillsList = this.skillsArray.concat(this.softSkillsArray);
    }
  }

  /**
  * Create a radar chart (skills matrix)
  * @param  labels    labels to display on the chart
  * @param  data      data for the chart
  * @param  elementId 'canvasSkills' or 'canvasSoftSkills'
  * @return           a radar chart
  */
  createOrUpdateChart(labels, data, elementId) {
    return new Chart(elementId, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Note',
          data: data,
          backgroundColor: [
            'rgba(00, 139, 210, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(00, 139, 210, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scale: {
          ticks: {
            min: 0,
            max: 4,
            step: 0.5
          }
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.labels[tooltipItem.index];
              return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  /* takes a string phrase and breaks it into separate phrases
  no bigger than 'maxwidth', breaks are made at complete words.*/
  /**
  * Breaks labels into arrays to display them in multiple lines in radar chart.
  * Breaks are made at complete words.
  * @param  labels   array of labels
  * @param  maxwidth max width per line
  * @return          new array with formatted labels
  */
  formatLabels(labels, maxwidth) {
    let formattedLabels = [];

    labels.forEach(function (label) {
      let sections = [];
      let words = label.split(" ");
      let temp = "";

      words.forEach(function (item, index) {
        if (temp.length > 0) {
          let concat = temp + ' ' + item;

          if (concat.length > maxwidth) {
            sections.push(temp);
            temp = "";
          }
          else {
            if (index == (words.length - 1)) {
              sections.push(concat);
              return;
            }
            else {
              temp = concat;
              return;
            }
          }
        }

        if (index == (words.length - 1)) {
          sections.push(item);
          return;
        }

        if (item.length < maxwidth) {
          temp = item;
        }
        else {
          sections.push(item);
        }

      });
      formattedLabels.push(sections);
    })
    return formattedLabels;
  }


}
