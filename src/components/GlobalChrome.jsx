'use client';

import { useEffect, useRef } from 'react';
import { runScript, whenLibsReady, alog } from '../lib/webflow.js';

// Runs the shared "global chrome" scripts (theme toggle, language switch, cursor,
// nav behaviour) exactly once, after libraries load and the persistent
// navbar/footer are mounted.
export default function GlobalChrome({ code }) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    whenLibsReady(() => {
      alog('libs ready -> running global chrome script (once)');
      runScript(code);
    });
  }, [code]);
  return null;
}
