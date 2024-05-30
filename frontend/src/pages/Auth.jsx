import AuthComponent from "../components/AUTH/AuthComponent";
import { authenticate } from "../util/api";

function Auth() {
  return <AuthComponent />;
}
export default Auth;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const errors = {};

  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "That doesn't look like an email address";
  }

  if (typeof password !== "string" || password.length < 6) {
    errors.password = "Password must be have min 6 characters";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  const data = {
    email: email,
    password: password,
  };

  const auth = await authenticate(mode, data);
  return auth;
}
