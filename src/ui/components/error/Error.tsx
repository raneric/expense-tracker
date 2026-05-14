import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();

  const message = (() => {
    if (isRouteErrorResponse(error)) {
      return error.data || `${error.status} ${error.statusText}`;
    }

    if (error instanceof Error) {
      return (error as Error).message;
    }

    return "Unexpected error occurred";
  })();

  return (
    <div style={{ padding: 24 }}>
      <h2>Oops</h2>
      <p>{message}</p>
    </div>
  );
}
