import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from '../../services/common/auth.service';



export const authGuard: CanActivateFn = (route, state) => {
  // const token: string = localStorage.getItem("accessToken");
  // const jwtHelper: JwtHelperService = inject(JwtHelperService);
  const router: Router = inject(Router);
  const toastrService: CustomToastrService = inject(CustomToastrService);
  const spinner: NgxSpinnerService = inject(NgxSpinnerService);

  // const decodeToken = jwtHelper.decodeToken(token);
  // const expirationDate = jwtHelper.getTokenExpirationDate(token);
  
  // let expired: boolean;

  // spinner.show(SpinnerType.BallAtom);
  // try {
  //   expired = jwtHelper.isTokenExpired(token);
  // } catch (error) {
  //   expired = true;
  // }

  if (!_isAuthenticated) { //auth.service'ten geliyor
    router.navigate(["login"], { queryParams: { returnUrl: state.url }});
    toastrService.message("Oturum açmanız gerekiyor!", "Yetkisiz Erişim", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }

  spinner.hide(SpinnerType.BallAtom);
  return true;
};
