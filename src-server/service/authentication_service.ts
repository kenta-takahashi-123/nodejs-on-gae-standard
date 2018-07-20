import {Session, User} from "../../src-shared/entity";

export class AuthenticationService {
  // noinspection JSMethodCanBeStatic
  authenticate(session: Session): User | null {
    if (session.id === "1234") {
      return {id: 1, first_name: "John", family_name: "Doe"};
    } else {
      return null;
    }
  }
}
