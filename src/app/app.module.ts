import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArraySkillsComponent } from './array-skills/array-skills.component';
import { ArraySkillsUpdateComponent } from './array-skills-update/array-skills-update.component';
import { DemoMaterialModule } from './material-modules';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ArraySkillsComponent,
    ArraySkillsUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DemoMaterialModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
