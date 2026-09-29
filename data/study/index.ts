import type { StudyChapter, StudySection } from './types';
import { chapter01 } from './chapter01';
import { chapter02 } from './chapter02';
import { chapter03 } from './chapter03';

/** 基準学習で遊べる章。章を足すときはここに追加する。 */
export const studyChapters: StudyChapter[] = [chapter01, chapter02, chapter03];
export const studySections: StudySection[] = studyChapters.flatMap(c => c.sections);
