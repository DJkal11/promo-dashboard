import { useState, useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import { fetcher, patchJson } from '../fetch';
import { filterPromotions } from '../filters';

// Helper to build the SWR key for server-side filters.
// We only send category/status to the server (date is client-side).
const keyFor = (params) => {
  console.log("params", params)
    const q = new URLSearchParams(params);
    console.log("query", q.toString())
    return q.toString() ? `/promotions?${q.toString()}` : '/promotions';
  };

export default function Dashboard() {

const [category, setCategory] = useState('');
const [status, setStatus] = useState(''); // '', 'active', 'inactive'
const [start, setStart] = useState('');   // yyyy-mm-dd
const [end, setEnd] = useState('');

// Compose the query params we want the server to handle
const serverParams = {
    ...(category ? { category } : {}),
    ...(status ? { active: String(status === 'active') } : {})
  };

const swrKey = keyFor(serverParams);
const { data, isLoading, error } = useSWR(swrKey, fetcher);


const promotions = useMemo(() => {
    return filterPromotions(data, { category, status, start, end });
  }, [data, category, status, start, end]);


const onApply = () => mutate(swrKey); // tells SWR to refetch this key
const onReset = () => {
    setCategory('');
    setStatus('');
    setStart('');
    setEnd('');
    mutate(swrKey);
  };

const onToggle = async (id, value) => {
    try {
      await patchJson(`/promotions/${id}`, { optedIn: value, active: value });
      await mutate(swrKey);
    } catch (e) {
      alert('Failed to update. Please try again.');
      console.log(e)
    }
  };

  const activeChips = [
    category && { label: `Category: ${category}` },
    status && { label: `Status: ${status}` },
    start && { label: `Start ≥ ${start}` },
    end && { label: `End ≤ ${end}` },
  ].filter(Boolean);

  return (
    <>
      {/* FILTERS CARD */}
      <section className="card" aria-label="Filters">
        <form className="toolbar" onSubmit={e => e.preventDefault()}>
          <div className="field">
            <label htmlFor="f-category">Category</label>
            <select id="f-category" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="">All Categories</option>
              <option>Casino</option>
              <option>Sports</option>
              <option>Poker</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="f-status">Status</label>
            <select id="f-status" value={status} onChange={e => setStatus(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="f-start">Start date</label>
            <input id="f-start" type="date" value={start} onChange={e => setStart(e.target.value)} />
          </div>

          <div className="field">
            <label htmlFor="f-end">End date</label>
            <input id="f-end" type="date" value={end} onChange={e => setEnd(e.target.value)} />
          </div>

          <div className="toolbar__actions">
            <button className="btn btn--primary" onClick={onApply}>Apply</button>
            <button className="btn" type="button" onClick={onReset}>Reset</button>
          </div>
        </form>

        {activeChips.length > 0 && (
          <div className="filters-summary" role="status" aria-live="polite">
            {activeChips.map((item, i) => <span key={i} className="chip">{item.label}</span>)}
          </div>
        )}
      </section>

      {/* STATUS AREA */}
      {isLoading && (
        <section className="card" aria-live="polite">
          Loading…
        </section>
      )}

      {error && (
        <section className="card" aria-live="polite">
          Couldn’t load promotions. <button className="btn" onClick={() => mutate(swrKey)}>Retry</button>
        </section>
      )}

      {!isLoading && !error && (
        promotions.length ? (
          <section className="flex" aria-label="Promotions">
            {promotions.map(item => (
              <article key={item.id} className="item">
                <h3>{item.title}</h3>
                <p className="meta">{item.category} • {item.active ? 'Active' : 'Inactive'}</p>
                <p className="meta">{item.startDate} → {item.endDate}</p>
                <button className="btn btn--primary" onClick={() => onToggle(item.id, !item.optedIn)}>
                  {item.optedIn ? 'Opt Out' : 'Opt In'}
                </button>
              </article>
            ))}
          </section>
        ) : (
          <section className="card" aria-live="polite">
            No promotions match your filters.
          </section>
        )
      )}
    </>
  );

}