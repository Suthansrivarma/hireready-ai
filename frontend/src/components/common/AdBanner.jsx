import React, { useEffect, useState } from 'react';

export default function AdBanner({
  slot = '1234567890',
  format = 'auto',
  responsive = 'true',
  label = 'ADVERTISEMENT',
  className = ''
}) {
  const adClient = import.meta.env.VITE_ADSENSE_CLIENT || 'ca-pub-9161483501270862';
  const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  );
  const [adFailed, setAdFailed] = useState(false);

  useEffect(() => {
    if (!isLocalhost && adClient && window.adsbygoogle) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense push error:', e);
        setAdFailed(true);
      }
    }
  }, [adClient, isLocalhost]);

  return (
    <div className={`my-6 text-center overflow-hidden ${className}`}>
      <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase block mb-1">
        {label}
      </span>

      {!isLocalhost && !adFailed ? (
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adClient}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      ) : (
        /* Preview / Localhost Ad Placeholder Box */
        <div className="bg-slate-900 border border-dashed border-indigo-500/40 rounded-2xl p-4 sm:p-5 text-center max-w-4xl mx-auto shadow-inner">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  ADSENSE ACTIVE ({adClient})
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                  Local Host Preview
                </span>
              </div>
              <h4 className="text-xs font-bold text-white">Google AdSense Display Unit</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Google AdSense automatically serves live paid ads here once deployed to your live domain.
              </p>
            </div>
            <span className="shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
              Ad Slot #{slot.slice(-4)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
