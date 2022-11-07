/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { SubmitSelfServiceLoginFlowBody } from '@ory/kratos-client';
import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import useAppDispatch from '../../store/useAppDispatch';
import { useAppSelector } from '../../store/useAppSelector';
import { login, resetLoginFlow, selectLoginFlow, setLoginFlow } from '../../store/authentication';
import { handleFlowError, handleGetFlowError } from '../../util/handleGetFlowError';
import oryClient from '../../util/ory-client';
import { UserAuthCard } from "@ory/elements"

export const Login = () => {
  const dispatch = useAppDispatch();
  const flow = useAppSelector(selectLoginFlow);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);

  const navigate = useHistory();

  // Get ?flow=... from the URL
  const returnTo = searchParams.get('return_to');
  const flowId = searchParams.get('flow');
  // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
  // of a user.
  const refresh = searchParams.get('refresh');
  // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
  // to perform two-factor authentication/verification.
  const aal = searchParams.get('aal');

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      oryClient
        .getSelfServiceLoginFlow(String(flowId))
        .then(({ data }) => {
          dispatch(setLoginFlow(data));
        })
        .catch(handleGetFlowError(navigate, 'login', () => dispatch(resetLoginFlow())));
      return;
    }

    // Otherwise we initialize it
    oryClient
      .initializeSelfServiceLoginFlowForBrowsers(
        Boolean(refresh),
        aal ? String(aal) : undefined,
        returnTo ? String(returnTo) : undefined,
      )
      .then(({ data }) => {
        dispatch(setLoginFlow(data));
      })
      .catch(handleFlowError(navigate, 'login', () => dispatch(resetLoginFlow())));
  }, [flowId, aal, refresh, returnTo, flow]);

  const title = flow?.refresh
    ? 'Confirm Action'
    : flow?.requested_aal === 'aal2'
      ? 'Two-Factor Authentication'
      : 'Login';

  // we check if the flow is set, if not we show a loading indicator
  return flow ? (
    // we render the login form using Ory Elements
    <UserAuthCard
      title={"Login"}
      flowType={"login"}
      // we always need the flow data which populates the form fields and error messages dynamically
      flow={flow}
      // the login card should allow the user to go to the registration page and the recovery page
      additionalProps={{
        forgotPasswordURL: "/recovery",
        signupURL: "/signup",
      }}
      // we might need webauthn support which requires additional js
      includeScripts={true}
      // we submit the form data to Ory
      onSubmit={({ body }) => {
        dispatch(login(navigate, body as SubmitSelfServiceLoginFlowBody));
      }}
    />
  ) : (
    <div>Loading...</div>
  )
};
