import { Panel, ShareBar } from "@franco_roura/module-01";

export function Split() {
  return (
    <ShareBar
      label="Where each subscription goes"
      className="max-w-md"
      parts={[
        { share: 80, label: "Runs your models" },
        { share: 20, label: "Keeps the lights on" },
      ]}
    />
  );
}

export function SeveralParts() {
  return (
    <Panel serial="T-02 · THIS WEEK" notch="sm" className="max-w-md">
      <ShareBar
        label="Time by activity this week"
        size="lg"
        parts={[
          { share: 14, label: "Field visits" },
          { share: 9, label: "Calibration" },
          { share: 6, label: "Reports" },
          { share: 3, label: "Other" },
        ]}
      />
    </Panel>
  );
}
