import React, { useMemo, useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import initialProducts from './sampleData.json';

const currency = n => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(n) || 0);
const slug = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const amazonSearch = name => `https://www.amazon.com/s?k=${encodeURIComponent(name)}&tag=bwtown1900-20`;
const amazonLink = (url, name) => {
  const href = url || amazonSearch(name);
  try {
    const parsed = new URL(href);
    if (parsed.hostname.endsWith('amazon.com') && !parsed.searchParams.has('tag')) parsed.searchParams.set('tag', 'bwtown1900-20');
    return parsed.toString();
  } catch { return amazonSearch(name); }
};

function App() {
  const [products, setProducts] = useState(() => initialProducts.map((p, i) => ({ ...p, id: p.id || `${slug(p.category)}-${i}`, image: p.image || '', asin: p.asin || '' })));
  const [selected, setSelected] = useState(() => JSON.parse(localStorage.getItem('stage-this-react-selected') || '{}'));
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState({});
  const [audio, setAudio] = useState([]);
  const [notice, setNotice] = useState('');
  const imageInput = useRef({});
  const fileRef = useRef(null);
  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const filtered = useMemo(() => products.filter(p => `${p.name} ${p.brand} ${p.category} ${p.note}`.toLowerCase().includes(query.toLowerCase())), [products, query]);
  const chosen = products.filter(p => selected[p.id]);
  const total = chosen.reduce((n, p) => n + (Number(p.price) || 0) * (Number(p.qty) || 1), 0);
  const saveSelection = next => { setSelected(next); localStorage.setItem('stage-this-react-selected', JSON.stringify(next)); };

  function updateProduct(id, patch) { setProducts(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p)); }
  function loadWorkbook(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'array' });
        const rows = wb.SheetNames.flatMap(sheet => XLSX.utils.sheet_to_json(wb.Sheets[sheet], { defval: '' }).map(row => ({ sheet, row })));
        const imported = rows.map(({ sheet, row }, i) => {
          const obj = Object.fromEntries(Object.entries(row).map(([k, v]) => [k.toLowerCase().trim(), v]));
          const get = (...keys) => keys.map(k => obj[k]).find(v => v !== undefined && v !== '');
          const name = get('item', 'product', 'name');
          if (!name) return null;
          return { id: `import-${Date.now()}-${i}`, category: String(get('subpackage', 'category', 'package') || sheet), name: String(name), brand: String(get('brand', 'recommended brand') || ''), qty: Number(get('qty', 'quantity') || 1), price: Number(String(get('price', 'unit price', 'unit_price', 'estimated unit price') || 0).replace(/[^0-9.]/g, '')) || 0, evidence: String(get('evidence', 'source') || 'Imported price'), asin: String(get('asin', 'amazon asin') || ''), url: String(get('amazon link', 'amazon url', 'url', 'link') || amazonSearch(name)), image: String(get('image', 'image url', 'photo url') || ''), note: String(get('comments', 'notes', 'note') || '') };
        }).filter(Boolean);
        if (!imported.length) throw new Error('No product rows found. Add an Item or Product column.');
        setProducts(imported); saveSelection({}); setNotice(`Loaded ${imported.length} products from your workbook.`);
      } catch (err) { setNotice(`Could not load workbook: ${err.message}`); }
    };
    reader.readAsArrayBuffer(file);
  }
  function loadImage(id, file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => updateProduct(id, { image: e.target.result });
    reader.readAsDataURL(file);
  }
  function importCsv(file) { loadWorkbook(file); }
  function exportCsv() {
    const rows = [['Category', 'Item', 'Brand', 'Qty', 'Unit price', 'Subtotal', 'ASIN', 'Amazon link', 'Price source'], ...chosen.map(p => [p.category, p.name, p.brand, p.qty, p.price, p.price * p.qty, p.asin, amazonLink(p.url, p.name), p.evidence])];
    const csv = rows.map(r => r.map(v => `"${String(v ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'stage-this-selected-home-setup.csv'; a.click(); URL.revokeObjectURL(a.href);
  }
  function restoreSample() { setProducts(initialProducts.map((p, i) => ({ ...p, id: `${slug(p.category)}-${i}`, image: '', asin: '' }))); saveSelection({}); setNotice('Sample home setup restored.'); }

  return <>
    <header className="top"><div><div className="logo">STAGE <span>THIS</span></div><div className="subtitle">EXECUTIVE RELOCATION · HOME SETUP</div></div><div className="top-right"><span>React catalog app</span><select aria-label="Choose collection"><option>Kitchen Collection</option><option>Home Essentials</option></select></div></header>
    <main>
      <div className="eyebrow">Home Setup / Kitchen Collection</div><h1>Move-in ready, beautifully considered.</h1><p>Curated home setup products for a Silicon Valley condo or apartment. Select products, add images and ASINs, and review an estimated package total.</p>
      <div className="metrics"><div className="metric"><small>Selected package estimate</small><strong>{currency(total)}</strong></div><div className="metric"><small>Selected items</small><strong>{chosen.length} / {products.length}</strong></div><div className="metric"><small>Product groups</small><strong>{categories.length}</strong></div></div>
      <section className="toolbar"><label className="button secondary" htmlFor="workbook">Load Excel or CSV</label><input id="workbook" ref={fileRef} type="file" accept=".xlsx,.xls,.csv" hidden onChange={e => importCsv(e.target.files[0])} /><button className="button secondary" onClick={restoreSample}>Restore sample</button><a className="button secondary" href="./AMAZON_INTEGRATION.md" target="_blank">Amazon connection notes</a></section>
      <div className="notice"><b>Amazon images and live prices:</b> Amazon does not provide live catalog data to a browser-only app. This catalog keeps the supplied price evidence and Amazon links. For current product images, ASINs, and prices, connect an approved Amazon Product Advertising API or licensed feed through a secure backend. Never put Amazon secret keys in this React app. Search links include the configured Associates tracking tag; confirm your account and link rules before publishing.</div>
      {notice && <div className="notice success" role="status">{notice}<button onClick={() => setNotice('')}>Dismiss</button></div>}
      <div className="toolbar tools"><input className="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products or brands" /><button className="button secondary" onClick={() => saveSelection(Object.fromEntries(products.map(p => [p.id, true])))}>Select all</button><button className="button secondary" onClick={() => saveSelection({})}>Clear all</button><button className="button" onClick={() => document.getElementById('selected-report').scrollIntoView({ behavior: 'smooth' })}>View selected report</button></div>
      <div className="layout"><section className="catalog">{categories.map(category => {
        const items = filtered.filter(p => p.category === category); if (!items.length) return null;
        const expanded = open[category] !== false;
        return <article className="package" key={category}><button className="package-head" onClick={() => setOpen(prev => ({ ...prev, [category]: !expanded }))}><div><h2>{category}</h2><span>{items.length} curated items</span></div><b>{expanded ? '−' : '+'}</b></button>{expanded && <div className="items">{items.map(p => <div className="item" key={p.id}>
          <input className="check" aria-label={`Select ${p.name}`} type="checkbox" checked={!!selected[p.id]} onChange={e => saveSelection({ ...selected, [p.id]: e.target.checked })} />
          <button className="thumb" title="Load product photo" onClick={() => imageInput.current[p.id]?.click()}>{p.image ? <img src={p.image} alt={p.name} /> : <span>＋<small>photo</small></span>}<input ref={el => imageInput.current[p.id] = el} type="file" accept="image/*" hidden onChange={e => loadImage(p.id, e.target.files[0])} /></button>
          <div className="details"><div className="item-name">{p.name}</div><div className="item-meta">{p.brand || 'Recommended item'} · Qty {p.qty || 1} · {p.evidence || 'Price to confirm'}</div><div className="editable"><label>ASIN <input value={p.asin || ''} placeholder="Add ASIN" onChange={e => updateProduct(p.id, { asin: e.target.value })} /></label><label>Image URL <input value={p.image?.startsWith('data:') ? '' : (p.image || '')} placeholder="Paste product image URL" onChange={e => updateProduct(p.id, { image: e.target.value })} /></label></div></div>
          <div className="pricebox"><strong>{currency(p.price)}</strong><small>each</small><a href={amazonLink(p.url, p.name)} target="_blank" rel="noreferrer">Amazon ↗</a></div>
        </div>)}</div>}</article>;
      })}</section>
      <aside className="side"><section className="panel"><div className="eyebrow">Catalog source</div><h2>Amazon product data</h2><p>Use the API notes to connect a backend that returns matching ASINs, product images, offer prices, and affiliate links.</p><div className="status"><span className="dot" /> Manual catalog mode</div><div className="small-note">This app shows the entered price and source label. It does not claim that a price is live.</div></section>
      <section className="panel"><div className="eyebrow">Audio workspace</div><h2>Load sounds or voice notes</h2><p>Add audio assets to this session for narration, room ambience, or setup instructions.</p><label className="button secondary upload-audio" htmlFor="audiofiles">Choose audio files</label><input id="audiofiles" type="file" accept="audio/*,.mp3,.wav,.m4a,.ogg" multiple hidden onChange={e => setAudio(prev => [...prev, ...Array.from(e.target.files).map(f => ({ file: f, url: URL.createObjectURL(f) }))])} />
        {audio.length > 0 && <div className="audio-list">{audio.map((a, i) => <div className="audio" key={`${a.file.name}-${i}`}><div><b>{a.file.name}</b><small>{(a.file.size / 1024 / 1024).toFixed(1)} MB</small></div><audio controls src={a.url} /><button aria-label={`Remove ${a.file.name}`} onClick={() => { URL.revokeObjectURL(a.url); setAudio(prev => prev.filter((_, n) => n !== i)); }}>×</button></div>)}</div>}
        {!audio.length && <div className="drop">MP3 · WAV · M4A · OGG<br /><small>Audio is previewed in this browser session.</small></div>}
      </section></aside></div>
      <section className="report" id="selected-report"><div className="report-head"><div><div className="eyebrow">Your package</div><h2>Selected Package Report</h2></div><div className="report-actions"><button className="button secondary" onClick={exportCsv}>Export CSV</button><button className="button" onClick={() => window.print()}>Print</button></div></div>
        {chosen.length ? chosen.map(p => <div className="report-row" key={p.id}><span>{p.name} <small>× {p.qty || 1}</small></span><strong>{currency((p.price || 0) * (p.qty || 1))}</strong></div>) : <p>Select products to build a report.</p>}
        <div className="report-row total"><span>Estimated merchandise</span><span>{currency(total)}</span></div><p className="small-note">Excludes tax, delivery, and setup. Confirm availability, exact model, and final price with the seller.</p>
      </section>
      <footer>Stage This · Executive relocation home setup</footer>
    </main>
  </>;
}

export default App;
