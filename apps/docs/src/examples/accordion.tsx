import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Panel,
} from "@franco_roura/module-01";

export function Questions() {
  return (
    <Accordion type="single" collapsible defaultValue="offline" className="max-w-xl">
      <AccordionItem value="offline">
        <AccordionTrigger>Does it work without a connection?</AccordionTrigger>
        <AccordionContent>
          Yes. Readings are kept on the device and upload as soon as it is back online.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="sensors">
        <AccordionTrigger>Which sensors can I connect?</AccordionTrigger>
        <AccordionContent>
          Any sensor that speaks Modbus, MQTT or plain serial. Most weather stations work out of the
          box.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="export">
        <AccordionTrigger>Can I export my data?</AccordionTrigger>
        <AccordionContent>Every project exports to CSV and GeoJSON, at any time.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function SettingsGroups() {
  return (
    <Panel serial="P-04 · SETTINGS" className="max-w-xl" bodyClassName="pb-2 sm:pb-3">
      <Accordion type="multiple" defaultValue={["sync"]}>
        <AccordionItem value="sync">
          <AccordionTrigger code="01">Sync</AccordionTrigger>
          <AccordionContent>Upload readings every 15 minutes, on any network.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="alerts">
          <AccordionTrigger code="02">Alerts</AccordionTrigger>
          <AccordionContent>
            Email the team when a sensor stops reporting for an hour.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="access">
          <AccordionTrigger code="03">Access</AccordionTrigger>
          <AccordionContent>
            Four members can edit this project; everyone else can view it.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Panel>
  );
}
