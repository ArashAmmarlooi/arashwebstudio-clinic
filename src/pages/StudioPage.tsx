import { useCallback, useEffect, useRef, useState } from 'react';
import { BrandedImage } from '../components/BrandedImage';
import { useApp } from '../context/AppContext';
import { BRAND, images } from '../data/site';
import { t } from '../i18n/translations';
import { useGsapReveal } from '../hooks/useGsapReveal';
import './StudioPage.css';

const presets = [
  { id: 'lobby', label: 'Reception', src: images.lobby },
  { id: 'team', label: 'Team', src: images.teamGroup },
  { id: 'physio', label: 'Physio', src: images.physioCard },
  { id: 'derma', label: 'Dermatology', src: images.derma },
];

export function StudioPage() {
  const { lang } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [src, setSrc] = useState(images.hero);
  const [overlay, setOverlay] = useState(0.1);
  const [blend, setBlend] = useState<'multiply' | 'soft-light' | 'color'>('soft-light');

  useGsapReveal('.reveal', [lang]);

  const renderCanvas = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = src;
    await img.decode().catch(() => undefined);
    const w = 1200;
    const h = Math.round((img.naturalHeight / img.naturalWidth) * w) || 800;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, w, h);
    ctx.globalCompositeOperation = blend === 'color' ? 'color' : 'source-over';
    ctx.fillStyle = `rgba(51, 102, 153, ${overlay})`;
    ctx.fillRect(0, 0, w, h);
    if (blend !== 'color') {
      ctx.globalCompositeOperation = blend as GlobalCompositeOperation;
      ctx.fillStyle = `rgba(51, 102, 153, ${overlay * 1.6})`;
      ctx.fillRect(0, 0, w, h);
    }
    ctx.globalCompositeOperation = 'source-over';
  }, [src, overlay, blend]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const onUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setSrc(url);
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/jpeg', 0.92);
    a.download = 'clinique-elan-branded.jpg';
    a.click();
  };

  return (
    <section className="studio section-pad">
      <div className="container studio__intro reveal">
        <p className="eyebrow eyebrow-line">{t('navStudio', lang)}</p>
        <h1 className="display">{t('studioTitle', lang)}</h1>
        <p className="lead">{t('studioLead', lang)}</p>
        <p className="studio-brand">
          Brand color: <strong>{BRAND}</strong>
        </p>
      </div>

      <div className="container studio__layout">
        <div className="studio-controls card reveal">
          <label className="upload-btn">
            {t('upload', lang)}
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onUpload(f);
              }}
            />
          </label>

          <label>
            {t('overlay', lang)} ({Math.round(overlay * 100)}%)
            <input
              type="range"
              min={0}
              max={0.35}
              step={0.01}
              value={overlay}
              onChange={(e) => setOverlay(Number(e.target.value))}
            />
          </label>

          <label>
            Blend
            <select value={blend} onChange={(e) => setBlend(e.target.value as typeof blend)}>
              <option value="soft-light">Soft light</option>
              <option value="multiply">Multiply</option>
              <option value="color">Color</option>
            </select>
          </label>

          <div className="studio-presets">
            {presets.map((p) => (
              <button key={p.id} type="button" onClick={() => setSrc(p.src)}>
                {p.label}
              </button>
            ))}
          </div>

          <button type="button" className="btn btn-primary" onClick={download}>
            {t('download', lang)}
          </button>
        </div>

        <div className="studio-preview reveal">
          <canvas ref={canvasRef} className="studio-canvas" />
          <BrandedImage src={src} alt="" className="studio-reference" />
        </div>
      </div>
    </section>
  );
}
