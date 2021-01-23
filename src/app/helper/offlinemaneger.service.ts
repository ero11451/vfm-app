import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, from, Observable, of } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { IonhelperService } from './ionhelper.service';


import { Storage } from '@ionic/storage';

interface StoredRequest {
  url: string;
  type: string;
  data: any;
  time: number;
  id: string;
}
const STORAGE_REQ_KEY = 'storedreq';

@Injectable({
  providedIn: 'root'
})
export class OfflinemanegerService {

  constructor(
    private ion: IonhelperService,
    private storage: Storage,
    private http: HttpClient,
   ) { }

   checkForEvents(): Observable<any> {
    return from(this.storage.get(STORAGE_REQ_KEY)).pipe(
      switchMap(storedOperations => {
        const storedObj = JSON.parse(storedOperations);
        if (storedObj && storedObj.length > 0) {
          return this.sendRequests(storedObj).pipe(
            finalize(() => {
              this.ion.ionToast('Local data succesfully synced to API!', 3000, '');
              this.storage.remove(STORAGE_REQ_KEY);
            })
          );
        } else {
          // this.ion.ionToast('check local storage', 100, 'waring');
          console.log('no local events to sync');
          return of(false);
        }
      })
    )
  }

  storeRequest(url, type, data) {
    this.ion.ionToast(`Your data is stored locally because you seem to be offline.`, 3000, '');
    const  action: StoredRequest = {
      url, type, data,  time: new Date().getTime(),
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)
    };

    return this.storage.get(STORAGE_REQ_KEY).then(storedOperations => {
      let storedObj = JSON.parse(storedOperations);
      if (storedObj) {
        storedObj.push(action);
      } else {
        storedObj = [action];
      }
      // Save old & new local transactions back to Storage
      return this.storage.set(STORAGE_REQ_KEY, JSON.stringify(storedObj));
    });
  }

  sendRequests(operations: StoredRequest[]) {
    const obs = [];

    for (let op of operations) {
      console.log('Make one request: ', op);
      let oneObs = this.http.request(op.type, op.url, op.data);
      obs.push(oneObs);
    }

    // Send out all local events and return once they are finished
    return forkJoin(obs);
  }
}
