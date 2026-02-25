/**
 * Mock hook – gibt immer einen Demo-User zurück.
 * Firebase Auth wurde für die Demo entfernt.
 */
export const useCurrentUser = (): {
  user: any;
  loading: boolean;
} => {
  return {
    user: {
      uid: "demo-user-001",
      email: "demo@koelnervermoegen.de",
      displayName: "Demo Nutzer",
      photoURL: null,
      emailVerified: true,
      getIdToken: async () => "demo-token",
    },
    loading: false,
  };
};
