import * as Rx from "rxjs";
import { ApiCaller } from "./lib/api-caller";
import { map } from "rxjs/operators";

(function () {
  let queries: any = window.location.search.substring(1).split("&").map(query => query.split('='))
    .reduce((result, [k, v]) => Object.assign(result, { [k]: decodeURI(v) }), {});

  let subscriptions = new Rx.Subscription();
  subscriptions.add(
    new ApiCaller().authenticate({ id: queries.session }).pipe(
      map(response => {
        let target = document.getElementById("target");
        if (target === null) {
          return;
        }
        if (response.status === 404) {
          target.appendChild(document.createTextNode(`Hello world from JavaScript!`));
        } else {
          target.appendChild(document.createTextNode(`Hello ${response.user.first_name} from JavaScript!`));
        }
      })
    ).subscribe()
  );
})();
