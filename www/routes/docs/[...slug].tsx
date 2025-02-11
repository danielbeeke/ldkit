import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import { gfm } from "../../utils/markdown.ts";

import {
  CATEGORIES,
  SLUGS,
  TABLE_OF_CONTENTS,
  TableOfContentsCategory,
  TableOfContentsCategoryEntry,
  TableOfContentsEntry,
} from "../../data/docs.ts";
import { App } from "../../components/App.tsx";

interface Data {
  page: Page;
}

interface Page extends TableOfContentsEntry {
  markdown: string;
}

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const slug = ctx.params.slug;
    if (slug === "") {
      return new Response("", {
        status: 307,
        headers: { location: "/docs/about-ldkit" },
      });
    }
    const entry = TABLE_OF_CONTENTS[slug];
    if (!entry) {
      return ctx.renderNotFound();
    }
    const url = new URL(`../../../${entry.file}`, import.meta.url);
    const markdown = await Deno.readTextFile(url);
    const page = { ...entry, markdown };
    const resp = ctx.render({ page });
    return resp;
  },
};

export default function DocsPage(props: PageProps<Data>) {
  return (
    <App activeLink="/docs" title={props.data.page?.title ?? "Not Found"}>
      <Head>
        <link rel="stylesheet" href={`/gfm.css?build=${__FRSH_BUILD_ID}`} />
      </Head>
      <div class="mx-auto max-w-screen-lg px-4 flex gap-6">
        <Sidebar path={props.url.pathname} />
        <Content page={props.data.page} />
      </div>
    </App>
  );
}

function Sidebar(props: { path: string }) {
  return (
    <nav class="w-[16rem] flex-shrink-0 pt-12 pr-4">
      <ul class="list-decimal list-inside font-semibold nested fixed">
        {CATEGORIES.map((category) => (
          <SidebarCategory path={props.path} category={category} />
        ))}
      </ul>
    </nav>
  );
}

const linkBase = "block px-8 py-2 rounded hover:bg-gray-200";
const link = linkBase;
const linkActive = `${linkBase} bg-gray-300`;

export function SidebarCategory(props: {
  path: string;
  category: TableOfContentsCategory;
}) {
  const { title, href, entries } = props.category;

  const linkClass = `${href == props.path ? linkActive : link} font-bold`;

  return (
    <li class="block">
      <a href={href} class={linkClass}>
        {title}
      </a>
      {entries.length > 0 && (
        <ul class="pl-2 nested">
          {entries.map((entry) => (
            <SidebarEntry path={props.path} entry={entry} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function SidebarEntry(props: {
  path: string;
  entry: TableOfContentsCategoryEntry;
}) {
  const { title, href } = props.entry;

  const linkClass = `${href == props.path ? linkActive : link} font-normal`;

  return (
    <li class="block">
      <a href={href} class={linkClass}>
        {title}
      </a>
    </li>
  );
}

function Content(props: { page: Page }) {
  const html = gfm.render(props.page.markdown);
  return (
    <main class="py-8 overflow-hidden flex-1">
      <div
        class="mt-6 markdown-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ForwardBackButtons slug={props.page.slug} />
    </main>
  );
}

const button = "p-2 bg-gray-100 w-full border(1 gray-200) grid";

function ForwardBackButtons(props: { slug: string }) {
  const currentIndex = SLUGS.findIndex((slug) => slug === props.slug);
  const previousSlug = SLUGS[currentIndex - 1];
  const nextSlug = SLUGS[currentIndex + 1];
  const previous = TABLE_OF_CONTENTS[previousSlug];
  const next = TABLE_OF_CONTENTS[nextSlug];

  const upper = "text(sm gray-600)";
  const category = "font-normal";
  const lower = "text-gray-900 font-medium";

  return (
    <div class="mt-8 flex flex(col md:row) gap-4">
      {previous && (
        <a href={previous.href} class={`${button} text-left`}>
          <span class={upper}>{"←"} Previous</span>
          <span class={lower}>
            <span class={category}>
              {previous.category
                ? `${TABLE_OF_CONTENTS[previous.category].title}: `
                : ""}
            </span>
            {previous.title}
          </span>
        </a>
      )}
      {next && (
        <a href={next.href} class={`${button} text-right`}>
          <span class={upper}>Next {"→"}</span>
          <span class={lower}>
            <span class={category}>
              {next.category
                ? `${TABLE_OF_CONTENTS[next.category].title}: `
                : ""}
            </span>
            {next.title}
          </span>
        </a>
      )}
    </div>
  );
}
