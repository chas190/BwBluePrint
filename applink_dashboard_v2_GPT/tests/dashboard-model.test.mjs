import assert from 'node:assert/strict';
import test from 'node:test';
import {
  canWriteDashboard,
  duplicateApp,
  insertAppInSection,
  moveAppOrder,
  moveAppToSectionOrder,
  parseDashboardPayload,
  readDashboardStorage,
  reorderSection,
} from '../src/dashboard-model.ts';

const section = (id, sortOrder) => ({
  id, title: id, tags: [], priority: 'p2', sortOrder, collapsed: false,
});

const app = (id, sectionId, sortOrder, extra = {}) => ({
  id, sectionId, name: id, description: '', url: 'https://example.test', imageUrl: '/grid.webp',
  icon: '', overlayColor: '#123456', overlayOpacity: 0.3, tags: [], priority: 'p3',
  favorite: false, sortOrder, launchCount: 0, lastOpenedAt: null, notes: [],
  createdAt: '2024-01-01T00:00:00.000Z', ...extra,
});

test('section reorder swaps position and writes consecutive order values', () => {
  const source = [section('alpha', 0), section('bravo', 1), section('charlie', 2)];
  const reordered = reorderSection(source, 'alpha', 1);
  assert.deepEqual(reordered.map((item) => [item.id, item.sortOrder]), [
    ['bravo', 0], ['alpha', 1], ['charlie', 2],
  ]);
  assert.deepEqual(source.map((item) => item.id), ['alpha', 'bravo', 'charlie']);
});

test('arrow reorder respects the visible order and normalizes saved card order', () => {
  const source = [app('a', 'one', 0), app('hidden', 'one', 1), app('b', 'one', 2), app('c', 'two', 4)];
  const moved = moveAppOrder(source, 'a', 1, ['a', 'b']);
  assert.deepEqual(moved.filter((item) => item.sectionId === 'one').sort((a, b) => a.sortOrder - b.sortOrder).map((item) => item.id), ['hidden', 'b', 'a']);
  assert.deepEqual(moved.filter((item) => item.sectionId === 'two').map((item) => item.sortOrder), [0]);
});

test('move and drag insertion keep destination and source order unique and stable', () => {
  const source = [app('a', 'one', 0), app('b', 'one', 1), app('c', 'two', 0), app('d', 'two', 1)];
  const moved = moveAppToSectionOrder(source, 'a', 'two');
  assert.deepEqual(moved.filter((item) => item.sectionId === 'one').sort((a, b) => a.sortOrder - b.sortOrder).map((item) => [item.id, item.sortOrder]), [['b', 0]]);
  assert.deepEqual(moved.filter((item) => item.sectionId === 'two').sort((a, b) => a.sortOrder - b.sortOrder).map((item) => [item.id, item.sortOrder]), [['c', 0], ['d', 1], ['a', 2]]);
  const inserted = insertAppInSection(moved, 'a', 'two', 'c');
  assert.deepEqual(inserted.filter((item) => item.sectionId === 'two').sort((a, b) => a.sortOrder - b.sortOrder).map((item) => item.id), ['a', 'c', 'd']);
});

test('valid v2 storage migrates missing durable dates and exact local image URL', () => {
  const legacy = {
    sections: [section('one', 3)],
    apps: [app('a', 'one', 9, {
      imageUrl: '/town-grid.png',
      createdAt: undefined,
      notes: [{ id: 'n1', text: 'remember', pinned: true, updatedAt: '2024-02-03T04:05:06.000Z' }],
    })],
  };
  delete legacy.apps[0].createdAt;
  const result = parseDashboardPayload(JSON.stringify(legacy), (url) => url === '/town-grid.png' ? '/town-grid.webp' : url);
  assert.equal(result.status, 'valid');
  assert.equal(canWriteDashboard(result), true);
  assert.equal(result.data.apps[0].imageUrl, '/town-grid.webp');
  assert.equal(result.data.apps[0].sortOrder, 0);
  assert.equal(result.data.sections[0].sortOrder, 0);
  assert.equal(result.data.apps[0].createdAt, new Date(0).toISOString());
  assert.equal(result.data.apps[0].notes[0].createdAt, '2024-02-03T04:05:06.000Z');
});

test('malformed payload is retained and explicitly blocks writes', () => {
  const raw = '{"sections":{},"apps":[]}';
  const result = readDashboardStorage(() => raw);
  assert.equal(result.status, 'invalid');
  assert.equal(result.raw, raw);
  assert.equal(canWriteDashboard(result), false);
  assert.match(result.warning, /retained/);

  const badDate = {
    sections: [section('one', 0)],
    apps: [app('a', 'one', 0, { notes: [{ id: 'bad-note', text: 'x', pinned: false, createdAt: 'not-a-date', updatedAt: 'also-bad' }] })],
  };
  const invalidNoteResult = parseDashboardPayload(JSON.stringify(badDate));
  assert.equal(invalidNoteResult.status, 'invalid');
  assert.equal(invalidNoteResult.raw, JSON.stringify(badDate));
  assert.equal(canWriteDashboard(invalidNoteResult), false);
});

test('unreadable storage access blocks writes instead of substituting seeds', () => {
  const result = readDashboardStorage(() => { throw new Error('storage denied'); });
  assert.equal(result.status, 'invalid');
  assert.equal(result.data, null);
  assert.equal(result.raw, null);
  assert.equal(canWriteDashboard(result), false);
});

test('orphaned cards are preserved in an explicit recovered section', () => {
  const payload = { sections: [section('one', 0)], apps: [app('orphan', 'deleted-section', 0)] };
  const result = parseDashboardPayload(JSON.stringify(payload));
  assert.equal(result.status, 'valid');
  assert.match(result.warning, /Recovered links/);
  const recovery = result.data.sections.find((item) => item.id === result.data.apps[0].sectionId);
  assert.equal(recovery.title, 'Recovered links');
  assert.equal(result.data.apps[0].id, 'orphan');
});

test('duplicate copies reset launch history and allocate independent IDs and notes', () => {
  const original = app('source', 'one', 0, {
    launchCount: 18,
    lastOpenedAt: '2024-03-03T00:00:00.000Z',
    notes: [{ id: 'note-old', text: 'copied content', pinned: true, createdAt: '2024-01-01T00:00:00.000Z', updatedAt: '2024-02-01T00:00:00.000Z' }],
  });
  const ids = ['copy-app', 'copy-note'];
  const copy = duplicateApp(original, () => ids.shift(), '2025-01-01T00:00:00.000Z');
  assert.equal(copy.id, 'copy-app');
  assert.equal(copy.launchCount, 0);
  assert.equal(copy.lastOpenedAt, null);
  assert.equal(copy.notes[0].id, 'copy-note');
  assert.notEqual(copy.notes[0], original.notes[0]);
  assert.equal(copy.notes[0].text, original.notes[0].text);
  copy.notes[0].text = 'independent edit';
  assert.equal(original.notes[0].text, 'copied content');
});
