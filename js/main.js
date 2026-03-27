import { initCursor } from './cursor.js';
import { initTyping } from './typing.js';

import { initProjects } from './projects.js';
import { initQuery } from './query.js';
import { initMarquee } from './marquee.js';
import { initReveal } from './reveal.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio: DOMContentLoaded fired.');
  const modules = [
    { name: 'Cursor', init: initCursor },
    { name: 'Typing', init: initTyping },

    { name: 'Projects', init: initProjects },
    { name: 'Query', init: initQuery },
    { name: 'Marquee', init: initMarquee },
    { name: 'Reveal', init: initReveal },
  ];

  modules.forEach(m => {
    try {
      console.log(`Portfolio: Initializing ${m.name}...`);
      m.init();
    } catch (err) {
      console.error(`Portfolio: ${m.name} initialization failed:`, err);
    }
  });
  console.log('Portfolio: Initialization complete.');
});
