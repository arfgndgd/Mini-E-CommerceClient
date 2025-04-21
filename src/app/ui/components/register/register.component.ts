import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../../entities/user';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {
  }

  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(150)]],
      password: ['', Validators.required],
      passwordCheck: ['', Validators.required]
    },
    // { Validators: (group: AbstractControl): ValidationErrors | null => {
    //   let password = group.get("password").value;
    //   let passwordCheck = group.get("passwordCheck").value;
    //   return password === passwordCheck ? null : { notSame: true };
    // }}
    { validators: passwordMatchValidator }
  ); 
  }

  //property (çağırdığımız yerde parantezsiz kullanacağız)
  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  onSubmit(data: User) {
    this.submitted = true;
    var f = this.frm;
    var c = this.component;
    debugger;
  }
}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const passwordCheck = control.get('passwordCheck');
  if (!password || !passwordCheck) return null;

  return password.value === passwordCheck.value ? null : { passwordMismatch: true };
};
