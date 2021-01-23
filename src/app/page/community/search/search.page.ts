import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { combineLatest } from "rxjs";
import { FollowService } from '../../../db/service/follow.service';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  @ViewChild('myDrop', {static: false}) searchDrop;

  searchterm;
  users;
  groups;

  hide = false;

  startAt = new Subject();
  endAt = new Subject();

  startObs = this.startAt.asObservable();
  endAtObs = this.endAt.asObservable();


  followerCount: number;
  isFollowing: boolean;

  followers;
  following;

  currentUserId;

  constructor(
    private followSvc: FollowService,
    private fireAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    ) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    combineLatest(this.startObs, this.endAtObs).subscribe(
      value => {
        this.doQuery(value[0], value[1]).subscribe(
          users => {
            if (users) {
              this.users = users;
              // this.searchDrop.open();
            }
          });
        this.doGroupQuery(value[0], value[1]).subscribe(
            groups => {
              if (groups) {
                this.groups = groups;
              }
            });
      });
  }

  doQuery(start, end) {
    return this.afs.collection('users', ref => ref.limit(3).orderBy('displayName').startAt(start).endAt(end)).valueChanges();
  }

  doGroupQuery(start, end) {
    return this.afs.collection('users', ref => ref.limit(3).orderBy('displayName').startAt(start).endAt(end)).valueChanges();
  }

  search($event) {
    const q = $event.target.value;
    this.startAt.next(q);
    this.endAt.next(q + '\uf8ff');
  }

  sendToProfile(user) {
    this.searchterm = null;
    this.router.navigateByUrl('profile/' + user.uid);
  }

}
