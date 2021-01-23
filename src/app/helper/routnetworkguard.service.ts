import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ConnectionStatus, NetworkService } from './network.service';
import { IonhelperService } from './ionhelper.service';

@Injectable({
  providedIn: 'root'
})
export class RoutnetworkguardService implements CanActivate {

 constructor(private router: Router, private ion: IonhelperService, private networkService: NetworkService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.networkService.onNetworkChange().subscribe((status: ConnectionStatus) => {
        if (status == ConnectionStatus.Offline) {
          this.router.navigate(['/nonetwork'])
          this.ion.ionLoading('You are offline Please on your network', 3000);
        }
      });
    });
  }
}
