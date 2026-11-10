import {
  Button,
  NavBar,
  Panel,
  SectionHeader,
  Toaster,
  TooltipProvider,
} from "@franco_roura/module-01";
import { Footer } from "@franco_roura/module-01/site";
import { useEffect } from "react";
import { Prose } from "./components/prose";
import { NPM, REPO, data } from "./data";
import { ColorsPage } from "./pages/colors";
import { ComponentPage, ComponentsIndex } from "./pages/component";
import { GettingStartedPage } from "./pages/getting-started";
import { OverviewPage } from "./pages/overview";
import { PlaygroundPage } from "./pages/playground";
import { TokensPage } from "./pages/tokens";
import { docBySlug } from "./registry";
import { Link, Router, useRoute } from "./router";

const nav = [
  { label: "Get started", href: "/getting-started", desktopOnly: true },
  { label: "Components", href: "/components" },
  { label: "Colors", href: "/colors" },
  { label: "Tokens", href: "/tokens", desktopOnly: true },
  { label: "Playground", href: "/playground", desktopOnly: true },
];

const isActive = (href: string, route: string) =>
  href === "/" ? route === "/" : route === href || route.startsWith(`${href}/`);

/** The page for a route and its document title. Shared by the client and the prerenderer. */
export function resolve(route: string): { title: string; page: React.ReactNode } {
  const doc = route.startsWith("/components/")
    ? docBySlug.get(route.slice("/components/".length))
    : undefined;
  if (doc) return { title: doc.name, page: <ComponentPage doc={doc} /> };

  switch (route) {
    case "/":
      return { title: "", page: <OverviewPage /> };
    case "/getting-started":
      return { title: "Get started", page: <GettingStartedPage /> };
    case "/colors":
      return { title: "Colors", page: <ColorsPage /> };
    case "/tokens":
      return { title: "Tokens", page: <TokensPage /> };
    case "/components":
      return { title: "Components", page: <ComponentsIndex /> };
    case "/playground":
      return { title: "Playground", page: <PlaygroundPage /> };
    case "/changelog":
      return {
        title: "Changelog",
        page: (
          <div className="flex flex-col gap-12">
            <SectionHeader code="S-05" label="Releases" title="Changelog" ruler />
            <Panel serial={`LATEST · V${data.version}`}>
              <Prose html={data.changelog} compact />
            </Panel>
          </div>
        ),
      };
    default:
      return {
        title: "Not found",
        page: (
          <div className="flex flex-col items-start gap-6">
            <SectionHeader
              code="E-404"
              label="Fault"
              title="No page here"
              ruler
              className="w-full"
            />
            <p className="text-ink-soft">The address doesn't match any page of these docs.</p>
            <Button asChild>
              <Link to="/">Back to the overview</Link>
            </Button>
          </div>
        ),
      };
  }
}

export const documentTitle = (route: string) => {
  const { title } = resolve(route);
  return title ? `${title} · Module/01` : "Module/01 · React component kit";
};

function Shell() {
  const route = useRoute();
  const { page } = resolve(route);

  useEffect(() => {
    document.title = documentTitle(route);
  }, [route]);

  return (
    <div className="mx-auto flex min-h-dvh max-w-content-max flex-col px-4 sm:px-6 lg:px-12 xl:max-w-[1280px]">
      <header className="sticky top-4 z-40 pt-0">
        <NavBar
          brand={
            <Link to="/" aria-label="Module/01, overview">
              Module/01
            </Link>
          }
          serial={`KIT · V${data.version}`}
          links={nav.map((item) => ({ ...item, active: isActive(item.href, route) }))}
          renderLink={(item, props) => <Link to={item.href} {...props} />}
          end={
            <Button size="sm" variant="secondary" asChild className="max-sm:hidden">
              <a href={REPO}>GitHub</a>
            </Button>
          }
        />
      </header>
      <main className="flex-1 pt-16 pb-24">{page}</main>
      <Footer
        left={`${data.name} · v${data.version}`}
        right="MIT / Apache-2.0"
        rulerLabels={["0", "20", "40", "60", "80", "100"]}
        links={[
          { label: "GitHub", href: REPO },
          { label: "npm", href: NPM },
          { label: "Changelog", href: `${import.meta.env.BASE_URL}changelog/` },
        ]}
      />
    </div>
  );
}

export function App({ path }: { path?: string }) {
  return (
    <Router path={path}>
      <TooltipProvider>
        <Shell />
        <Toaster />
      </TooltipProvider>
    </Router>
  );
}
