import { useAuthContext } from "../context/AuthContext";
import { Redirect, useHistory } from "react-router-dom";

/*
this function checks if a user can access a resource based on a config key.
the config key must be added to the authcontext query for it to be available
authz will be performed on the server as well. users are redirected for
convenience.
 */
export function usePublicAccessCheck(key: string) {
  const { loading: authLoading, current_user, config } = useAuthContext();
  const { push } = useHistory();

  if (!authLoading && !current_user?.id && config[key] !== "public")
    push("/login");
}
