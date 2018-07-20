import * as Rx from "rxjs";
import {ApiCaller} from "./lib/api-caller";
import {map} from "rxjs/operators";

(function () {
  let subscriptions = new Rx.Subscription();
  subscriptions.add(
    new ApiCaller().authenticate({id: "1234"}).pipe(
      map(user => {
        let target = document.getElementById("target");
        // noinspection TypeScriptValidateTypes
        if (target !== null) {
          target.appendChild(document.createTextNode(`Hello ${user.first_name} from JavaScript!`));
        }
      })
    ).subscribe()
  );
})();
