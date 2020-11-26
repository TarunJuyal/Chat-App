import React, { useEffect } from "react";
import { auth } from "../actions/userActions";
import { useSelector, useDispatch } from "react-redux";

export default function (SpecificComponent) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then(async (response) => {
        if (await !response.payload.isAuth) {
            props.history.push("/");
        } else if(await response.payload.isAuth) {
          props.history.push("/dashboard");
        }
      });
    }, [dispatch, props.history]);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
