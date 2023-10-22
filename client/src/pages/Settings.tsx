import React from "react";

type SettingsProps = {
  setAuth: (bool: boolean) => void;
};

const Settings: React.FC<SettingsProps> = () => {
  return <div>settings page</div>;
};
export default Settings;
