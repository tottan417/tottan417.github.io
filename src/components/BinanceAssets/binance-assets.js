import React, { useEffect, useState } from 'react';
import './binance-assets.css';

const API_URL = 'https://binance-assets-api.onrender.com/api/assets';

function BinanceAssets() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!API_URL) {
      setError('Asset API is not configured.');
      setLoading(false);
      return undefined;
    }

    let cancelled = false;

    const load = async () => {
      try {
        const response = await fetch(API_URL, { cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        if (!cancelled) {
          setData(json);
          setError('');
        }
      } catch (e) {
        if (!cancelled) setError('Binance assets are temporarily unavailable.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    const timer = window.setInterval(load, 60000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  const balances = data?.balances || [];

  return (
    <section className="component binance-assets">
      <div className="binance-assets-header">
        <div>
          <p className="binance-assets-eyebrow">BINANCE</p>
          <h2>Assets</h2>
        </div>
      </div>

      {loading && <p className="binance-assets-muted">Loading...</p>}
      {!loading && error && <p className="binance-assets-muted">{error}</p>}

      {!loading && !error && data && (
        <>
          <div className="binance-assets-total">
            <span>Total</span>
            <strong>{Number(data.total_usdt || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })} USDT</strong>
          </div>

          <div className="binance-assets-list">
            {balances.slice(0, 6).map((item) => (
              <div className="binance-assets-row" key={item.asset}>
                <span>{item.asset}</span>
                <span>
                  {Number(item.total || 0).toLocaleString(undefined, { maximumFractionDigits: 8 })}
                </span>
              </div>
            ))}
          </div>

          {data.updated_at && (
            <p className="binance-assets-updated">
              Updated {new Date(data.updated_at).toLocaleTimeString()}
            </p>
          )}
        </>
      )}
    </section>
  );
}

export default BinanceAssets;
