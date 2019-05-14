import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { SkillsFormsComponent } from './skills-forms/skills-forms.component';

const routes: Routes = [
  {path: '', component: SkillsFormsComponent},
  {path: 'test', component: TestComponentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
