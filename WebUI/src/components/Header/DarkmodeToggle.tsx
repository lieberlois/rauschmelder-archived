import React, { useState, useEffect } from "react";
import { IonIcon, IonSegment, IonSegmentButton } from "@ionic/react";
import { wantsDarkmode, setDarkmode } from "../../theme/darkmode";
import { moon, sunny } from "ionicons/icons";

export function DarkmodeToggle() {
  const [isChecked, setChecked] = useState<string>();
  const getBoolean = (value: string) => value === "true";

  useEffect(() => {
    setChecked(String(wantsDarkmode()));
  }, []);

  useEffect(() => {
    setDarkmode(getBoolean(isChecked!)!);
  }, [isChecked]);

  return (
    <IonSegment onIonChange={e => setChecked(e.detail.value)} value={isChecked}>
      <IonSegmentButton value="true">
        <IonIcon icon={moon} color={getBoolean(isChecked!) ? "warning" : ""} />
      </IonSegmentButton>
      <IonSegmentButton value="false">
        <IonIcon icon={sunny} color={getBoolean(isChecked!) ? "" : "warning"} />
      </IonSegmentButton>
    </IonSegment>
  );
}