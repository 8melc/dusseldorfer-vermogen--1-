import UserInterestsSelector from "components/UserInterestsSelector";
import React from "react";

const UserInterestsSelePreviewPage: React.FC = () => {
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <UserInterestsSelector
          onInterestsChange={(interests) => {
            console.log("Ausgewählte Interessen auf der Preview-Seite:", interests);
          }}
        />
      </div>
    </main>
  );
};

export default UserInterestsSelePreviewPage;