import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../../entities/user';
import { UserService } from '../../../services/common/models/user.service';
import { Create_User } from '../../../contracts/users/create_user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService) {
  }

  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(3)]],
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
  async onSubmit(user: User) {
    this.submitted = true;
    if (this.frm.invalid) {
      return;
    }
    const result: Create_User = await this.userService.create(user);
    if (result.succeeded) {
      this.toastrService.message(result.message, "Kullanıcı kaydı başarılı", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })
    } else {
      this.toastrService.message(result.message, "Hata! Kullanıcı kaydında hata ile karşılaşıldı", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
    }
  }
}

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const passwordCheck = control.get('passwordCheck');
  if (!password || !passwordCheck) return null;

  return password.value === passwordCheck.value ? null : { passwordMismatch: true };
};
