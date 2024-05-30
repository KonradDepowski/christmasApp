import { useRouteError } from "react-router";
import ErrorContent from "../components/UI/ErrorContent";
import MainNavigation from "../components/UI/MainNavigation";

function Error() {
  const error = useRouteError();
  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error) {
    if (error.message) {
      message = error.data?.message || "Something went wrong!";
    }
  }

  if (error.status === 404) {
    message = error.statusText;
  }

  return (
    <>
      <MainNavigation />
      <ErrorContent title={title} message={message} />
    </>
  );
}
export default Error;
