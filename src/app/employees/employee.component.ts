import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from '../employee.service';
import { ModalBasicComponent } from '../components/modal-basic/modal-basic.component';
import { faAt, faBriefcase, faCoffee, faEnvelope, faEdit, faTrash, faUser, faVenusMars } from '@fortawesome/free-solid-svg-icons';
const Swal = require('sweetalert2')


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class employeeComponent implements OnInit {
  @ViewChild(ModalBasicComponent) modal: ModalBasicComponent;
  @ViewChild('content') content: ElementRef;

  employees: any = [];
  employee: any = {};
  faCoffee = faCoffee;
  faEdit = faEdit;
  faTrash = faTrash;

  faUser = faUser
  faAt = faAt
  faVenusMars = faVenusMars
  faBriefcase = faBriefcase
  faEnvelope = faEnvelope

  filtros: any = {
    name: '',
    limit: ''
  }

  Data: Array<any> = [];
  Areas: Array<any> = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    id: new FormControl(0),
    sex: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    news: new FormControl('', [Validators.required]),
    rol: this.fb.array([]),
    description: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  pagination = {
    pageSize: 5,
    page: 1,
    collectionSize: 0
  }

  status: any = 'Inactivo';
  loading: boolean = false;
  closeResult = '';
  constructor(private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllemployee();
    this.getAllAreas();
    this.getAllRoles();
  }

  getAllemployee(page = 1) {
    this.loading = true;
    this.employeeService.getEmployee()
      .subscribe((res: any) => {
        console.log(res);
        this.loading = false;
        this.employees = res.data.data;
      });
  }

  getAllAreas() {
    this.employeeService.getAreas()
      .subscribe((res: any) => {
        this.Areas = res.data;
      });
  }

  getAllRoles() {
    this.employeeService.getRoles()
      .subscribe((res: any) => {
        this.Data = res.data;
      });
  }


  onCheckboxChange(e) {
    const rol: FormArray = this.form.get('rol') as FormArray;
    if (e.target.checked) {
      rol.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      rol.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          rol.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  anularOActivar(employee) {


    Swal.fire({
      title: 'Estas Seguro?',
      text: "Deseas registar este empleado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(employee)
          .subscribe((res: any) => {
            if (res.code === 200) {
              this.getAllemployee();
              Swal.fire(
                'Exito!',
                'Felicidades, se ha Eliminado el empleado.',
                'success'
              )
            } else {
              alert('Algunos datos Errores.')
            }
          });
      }
    })
  }


  registerNull(employee) {
    this.employee = employee;

  }

  openModal() {
    this.open(this.content)
  }

  getemployee(employee) {
    console.log({ ...employee });
    this.form.patchValue({
      'id': employee.id,
      'area': employee.area_id,
      'name': employee.nombre,
      'email': employee.email,
      'news': employee.boletin,
      'description': employee.descripcion,
      'sex': employee.sexo,
      'rol': this.getRols(employee.roles)
    });
    this.open(this.content)
  }


  getRols(rols: any): any {
    const rol = []
    rols.forEach(element => {
      rol.push(element.id);
    });

    return rol
  }

  createNewemployee() {

    Swal.fire({
      title: 'Estas Seguro?',
      text: "Deseas registar este empleado!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.form.markAsTouched();
        console.log([this.form.invalid, this.form.value]);
        if (this.form.invalid) { return false; }
        if (this.form.get('id').value != 0) {
          this.updateemployee()
        }
        if (this.form.get('id').value == 0) {
          this.storeemployee()
        }
      }
    })
  }

  storeemployee() {
    this.employeeService.createNewEmployee(this.form.value)
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.getAllemployee();
          this.modalService.dismissAll();
          Swal.fire(
            'Exito!',
            'Felicidades, se ha guardadodo el empleado.',
            'success'
          )
        } else {
          alert('Algunos datos Errores.')
        }
      });
  }

  updateemployee() {
    this.form.markAsTouched();
    if (this.form.invalid) { return false; }
    this.employeeService.updateEmployee(this.form.value)
      .subscribe((res: any) => {
        if (res.code === 200) {
          this.getAllemployee();
          this.modalService.dismissAll();
          Swal.fire(
            'Exito!',
            'Felicidades, se ha actualizado el empleado.',
            'success'
          )
        } else {
          alert('Algunos datos Errores.')
        }
      });
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  get name_employee_valid() {
    return (
      this.form.get('name').invalid && this.form.get('name').touched
    )
  }

  get description_employee_valid() {
    return (
      this.form.get('description').invalid && this.form.get('description').touched
    )
  }

  get limit_employee_valid() {
    return (
      this.form.get('limit').invalid && this.form.get('limit').touched
    )
  }

}
