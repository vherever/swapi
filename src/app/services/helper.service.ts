import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HelperService {

  /*--- This is for communication between components ---*/
  // Observable string sources
  private emitChangeSource = new Subject();

  // Observable string streams
  public changeEmitted$ = this.emitChangeSource.asObservable();

  // Service message commands
  public emitChange(change: any) {
    this.emitChangeSource.next(change);
  }
  /*---*/

}
