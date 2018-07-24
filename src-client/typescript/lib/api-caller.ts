import * as Rx from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, map } from "rxjs/operators";
import { Status } from "../../../src-shared/api/api_response";
import { SessionApiResponse } from "../../../src-shared/api/session_api_response";
import { Session } from "../../../src-shared/entity";

export class ApiCaller {
  authenticate(session: Session): Rx.Observable<SessionApiResponse> {
    if (session.id !== "") {
      return ajax.getJSON(`/api/v1/sessions/${session.id}`).pipe(
        catchError((e, _caught) => Rx.of(e)),
        map(e => e as SessionApiResponse)
      );
    } else {
      return Rx.of({ status: Status.NotFound })
    }
  }
}
