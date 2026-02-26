import * as React from "react";
import { config } from "./config";
import { firebaseAuth } from "./firebase";

interface Props {
  signInOptions: {
    google?: boolean;
    facebook?: boolean;
    github?: boolean;
    twitter?: boolean;
    emailAndPassword?: boolean;
    magicLink?: boolean;
  };
}

export const SignInOrUpForm = (_props: Props) => {
  if (!config || !firebaseAuth) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <p>Firebase Auth ist nicht konfiguriert.</p>
        <p>Bitte prüfe die Environment Variables.</p>
      </div>
    );
  }

  // Lazy import firebaseui only when actually needed
  const StyledFirebaseAuth = React.lazy(
    () => import("react-firebaseui/StyledFirebaseAuth")
  );

  return (
    <React.Suspense fallback={<div>Lade Login...</div>}>
      <StyledFirebaseAuth
        firebaseAuth={firebaseAuth}
        uiConfig={{
          signInFlow: "popup",
          signInOptions: [],
          signInSuccessUrl: config.signInSuccessUrl,
          siteName: config.siteName,
        }}
      />
    </React.Suspense>
  );
};
