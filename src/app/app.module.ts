import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations" ; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArraySkillsComponent } from './array-skills/array-skills.component';
import { ArraySkillsUpdateComponent } from './array-skills-update/array-skills-update.component';
import { DemoMaterialModule } from './material-modules';
import { FormsModule } from '@angular/forms';
import { TestComponentComponent } from './test-component/test-component.component';
import { SkillsFormsComponent } from './skills-forms/skills-forms.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';


@NgModule({
  declarations: [
    AppComponent,
    ArraySkillsComponent,
    ArraySkillsUpdateComponent,
    TestComponentComponent,
    SkillsFormsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    PDFExportModule
  ],
  providers: [],
  entryComponents: [TestComponentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
