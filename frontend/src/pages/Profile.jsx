import UserProfile from "../components/PROFILE/UserProfile";
import { updateUserProfile } from "../util/api";

function Profile() {
  return <UserProfile />;
}
export default Profile;

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const age = formData.get("age");
  const avatar = formData.get("avatar");
  const errors = {};

  if (typeof email !== "string" || !email.includes("@")) {
    errors.email = "That doesn't look like an email address";
  }

  if (typeof name !== "string" || name.length < 3) {
    errors.name = "Name must be have min 3 characters";
  }

  if (typeof age !== "string" || age.length < 1) {
    errors.age = "Please set a correct age";
  }

  if (typeof avatar !== "string") {
    errors.avatar = "Please choose an avatar";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  const data = {
    email: email,
    age: age,
    name: name,
    avatar: avatar,
  };

  const updatedData = await updateUserProfile(data);
  return updatedData;
}
