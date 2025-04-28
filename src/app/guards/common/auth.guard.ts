import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';



export const authGuard: CanActivateFn = (route, state) => {
  const token: string = localStorage.getItem("accessToken");
  const jwtHelper: JwtHelperService = inject(JwtHelperService);

  const decodeToken = jwtHelper.decodeToken(token);
  const expirationDate = jwtHelper.getTokenExpirationDate(token);
  const expired: boolean = jwtHelper.isTokenExpired(token);
  
  debugger;
  return true;
};
