import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';

@NgModule({
  declarations: [
    ModalBasicComponent
  ],
  exports: [
    ModalBasicComponent

  ],
  imports: [
    FormsModule,
    CommonModule

  ]
})
export class ComponentsModule { }
