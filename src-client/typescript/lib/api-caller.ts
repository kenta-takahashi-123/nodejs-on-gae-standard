import * as Rx from "rxjs";
import {Session, User} from "../../../src-shared/entity";
import {map} from "rxjs/operators";
import {ajax} from "rxjs/ajax";

export class ApiCaller {
  authenticate(session: Session): Rx.Observable<User> {
    return ajax.getJSON(`/api/v1/sessions/${session.id}`).pipe(map(e => e as User));
  }
}
