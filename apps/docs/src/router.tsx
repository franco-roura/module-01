import { createContext, useContext, useEffect, useState } from "react";
import type * as React from "react";

// A router small enough to read: paths under the Vite base, pushState navigation, and a
// `path` prop for prerendering.

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/** "/module-01/components/button/" -> "/components/button". */
export function toRoute(pathname: string): string {
  const path = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return path.replace(/\/+$/, "") || "/";
}

/** "/components/button#props" -> "/module-01/components/button/#props". */
export function href(to: string): string {
  const [route = "/", hash] = to.split("#");
  const path = route === "/" ? `${BASE}/` : `${BASE}${route}/`;
  return hash ? `${path}#${hash}` : path;
}

const RouteContext = createContext<{ route: string; go: (to: string) => void }>({
  route: "/",
  go: () => {},
});

export function Router({ path, children }: { path?: string; children: React.ReactNode }) {
  const [route, setRoute] = useState(() => path ?? toRoute(window.location.pathname));

  useEffect(() => {
    const onPop = () => setRoute(toRoute(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const go = (to: string) => {
    window.history.pushState(null, "", href(to));
    setRoute(to.split("#")[0] || "/");
    window.scrollTo(0, 0);
  };

  return <RouteContext value={{ route, go }}>{children}</RouteContext>;
}

export const useRoute = () => useContext(RouteContext).route;
export const useNavigate = () => useContext(RouteContext).go;

/** An in-site link. Modified clicks (new tab) fall through to the browser. */
export function Link({
  to,
  onClick,
  ...props
}: Omit<React.ComponentProps<"a">, "href"> & { to: string }) {
  const go = useNavigate();
  return (
    <a
      href={href(to)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        go(to);
      }}
      {...props}
    />
  );
}
