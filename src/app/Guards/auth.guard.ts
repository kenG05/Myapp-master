import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth:AuthService = new AuthService()
  const router: Router = new Router();
  return true;

  if(auth.isConnected()){
    return true;
  }else{
    router.navigate(['/home']);
    return false;
  }
};
