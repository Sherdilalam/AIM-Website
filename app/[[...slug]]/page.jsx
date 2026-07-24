import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { notFound } from 'next/navigation';
import routes from '../../src/generated/routes.js';
import PageRuntime from '../../src/components/PageRuntime.jsx';

const bySlug = Object.fromEntries(routes.map((r) => [r.slug, r]));

// Only the pages we know about are generated; anything else 404s.
export const dynamicParams = false;

export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.slug === 'index' ? [] : [r.slug] }));
}

function slugOf(params) {
  const s = params?.slug;
  return s && s.length ? s.join('/') : 'index';
}

function readGenerated(rel) {
  return readFileSync(join(process.cwd(), 'src/generated', rel), 'utf8');
}

export async function generateMetadata({ params }) {
  const meta = bySlug[slugOf(await params)];
  if (!meta) return {};
  return {
    title: meta.title || undefined,
    description: meta.description || undefined,
    alternates: meta.canonical ? { canonical: meta.canonical } : undefined,
    openGraph: {
      title: meta.title || undefined,
      description: meta.description || undefined,
      images: meta.ogImage ? [meta.ogImage] : undefined,
      type: 'website',
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function Page({ params }) {
  const slug = slugOf(await params);
  const meta = bySlug[slug];
  if (!meta) notFound();

  const content = readGenerated(`content/${slug}.html`);
  const pageScript = readGenerated(`scripts/${slug}.js`);

  return (
    <>
      <main dangerouslySetInnerHTML={{ __html: content }} />
      <PageRuntime
        key={slug}
        slug={slug}
        wfPage={meta.wfPage}
        path={meta.path}
        title={meta.title}
        pageScript={pageScript}
      />
    </>
  );
}
