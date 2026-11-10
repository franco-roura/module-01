import type { Prop } from "../data";

/** A component's own props, read from its types at build time. */
export function PropsTable({ name, props }: { name: string; props: Prop[] }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-mono text-body-sm font-bold text-ink">{`<${name}>`}</h3>
      <div className="overflow-x-auto rounded-md border border-seam bg-shell">
        <table className="w-full min-w-[560px] border-collapse text-left text-body-sm">
          <thead>
            <tr className="hud-sm text-ink-soft">
              <th className="px-4 py-2.5 font-normal">Prop</th>
              <th className="px-4 py-2.5 font-normal">Type</th>
              <th className="px-4 py-2.5 font-normal">Default</th>
              <th className="px-4 py-2.5 font-normal">Notes</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr key={prop.name} className="border-t border-seam align-top">
                <td className="px-4 py-2.5 font-mono whitespace-nowrap text-ink">
                  {prop.name}
                  {prop.required && (
                    <span className="text-signal-ink" title="Required">
                      {" *"}
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 font-mono text-[13px] text-ink-soft">{prop.type}</td>
                <td className="px-4 py-2.5 font-mono text-[13px] whitespace-nowrap text-ink-soft">
                  {prop.defaultValue ?? "—"}
                </td>
                <td className="px-4 py-2.5 text-ink">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
