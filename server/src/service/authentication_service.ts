import { Session, User } from "../../../shared/src/entity";

export class AuthenticationService {
  static authenticate(session: Session): User | null {
    // TODO implement database access
    if (session.id === "1234") {
      return { id: 1, first_name: "John", family_name: "Doe" };
    } else if (session.id === "4321") {
      throw new Error("database error");
    } else {
      return null;
    }
  }
}
