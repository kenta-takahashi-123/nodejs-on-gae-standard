import {Session, User} from "../../../shared/src/entity";

export class AuthenticationService {
  static authenticate(session: Session): User | "error" | null {
    if (session.id === "1234") {
      return { id: 1, first_name: "John", family_name: "Doe" };
    } else if (session.id === "4321") {
      return "error";
    } else {
      return null;
    }
  }
}
