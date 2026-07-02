// Combines all per-category data files (sibling files in this same folder,
// e.g. ./programming.js, ./web.js, etc.) back into the two lookup objects
// the rest of the app expects: one for lesson content (videos + notes), one
// for quiz questions. Add a new category by creating a new ./<name>.js file
// with `content` and `questions` exports, then adding it to the
// CATEGORY_MODULES map below.

import * as programming from './programming';
import * as web from './web';
import * as mobile from './mobile';
import * as ai from './ai';
import * as datascience from './datascience';
import * as cloud from './cloud';
import * as security from './security';
import * as database from './database';
import * as design from './design';
import * as marketing from './marketing';
import * as business from './business';
import * as communication from './communication';
import * as testing from './testing';
import * as general from './general';

const CATEGORY_MODULES = {
  programming,
  web,
  mobile,
  ai,
  datascience,
  cloud,
  security,
  database,
  design,
  marketing,
  business,
  communication,
  testing,
  general
};

export const categoryContentBank = Object.fromEntries(
  Object.entries(CATEGORY_MODULES).map(([key, mod]) => [key, mod.content])
);

export const categoryQuestionBank = Object.fromEntries(
  Object.entries(CATEGORY_MODULES).map(([key, mod]) => [key, mod.questions])
);

// Categories where a "build it / test it / code it" metaphor makes sense,
// vs. categories where the topic is a soft/practical skill (email writing,
// presenting, marketing, etc.) and needs plain, human wording instead.
export const TECHNICAL_CATEGORIES = ['programming', 'web', 'mobile', 'ai', 'datascience', 'cloud', 'security', 'database', 'testing'];