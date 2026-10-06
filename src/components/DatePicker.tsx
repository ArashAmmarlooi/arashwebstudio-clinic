import { useMemo, useState } from 'react';
import type { Lang } from '../i18n/translations';
import {
  formatAppointmentDate,
  getMonthMatrix,
  parseIsoDate,
  startOfDay,
  toIsoDate,
} from '../lib/dateUtils';
import './DatePicker.css';

type Props = {
  value: string;
  onChange: (iso: string) => void;
  lang: Lang;
};

const YEAR_SPAN = 3;

export function DatePicker({ value, onChange, lang }: Props) {
  const selected = parseIsoDate(value);
  const today = startOfDay(new Date());
  const minYear = today.getFullYear();
  const maxYear = minYear + YEAR_SPAN - 1;

  const [viewYear, setViewYear] = useState(selected.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected.getMonth());

  const locale = lang === 'fr' ? 'fr-CA' : 'en-CA';

  const monthOptions = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i,
        label: new Intl.DateTimeFormat(locale, { month: 'long' }).format(
          new Date(2026, i, 1),
        ),
      })),
    [locale],
  );

  const yearOptions = useMemo(
    () => Array.from({ length: YEAR_SPAN }, (_, i) => minYear + i),
    [minYear],
  );

  const weekdays = useMemo(() => {
    const base = new Date(2026, 0, 5); // Monday
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(d);
    });
  }, [locale]);

  const weeks = getMonthMatrix(viewYear, viewMonth);

  const clampView = (year: number, month: number) => {
    let y = Math.min(maxYear, Math.max(minYear, year));
    let m = month;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    if (m > 11) {
      m = 0;
      y += 1;
    }
    y = Math.min(maxYear, Math.max(minYear, y));
    setViewYear(y);
    setViewMonth(m);
  };

  const pickDay = (day: Date) => {
    if (startOfDay(day) < today) return;
    onChange(toIsoDate(day));
    setViewYear(day.getFullYear());
    setViewMonth(day.getMonth());
  };

  const shiftMonth = (delta: number) => {
    const next = new Date(viewYear, viewMonth + delta, 1);
    clampView(next.getFullYear(), next.getMonth());
  };

  return (
    <div className="date-picker">
      <div className="date-picker__toolbar">
        <button
          type="button"
          className="date-picker__nav"
          onClick={() => shiftMonth(-1)}
          aria-label={lang === 'fr' ? 'Mois précédent' : 'Previous month'}
        >
          ‹
        </button>

        <div className="date-picker__selects">
          <label>
            <span>{lang === 'fr' ? 'Mois' : 'Month'}</span>
            <select
              value={viewMonth}
              onChange={(e) => {
                const m = Number(e.target.value);
                clampView(viewYear, m);
              }}
            >
              {monthOptions.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>{lang === 'fr' ? 'Année' : 'Year'}</span>
            <select
              value={viewYear}
              onChange={(e) => {
                const y = Number(e.target.value);
                clampView(y, viewMonth);
              }}
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          className="date-picker__nav"
          onClick={() => shiftMonth(1)}
          aria-label={lang === 'fr' ? 'Mois suivant' : 'Next month'}
        >
          ›
        </button>
      </div>

      <p className="date-picker__selected">{formatAppointmentDate(value, lang)}</p>

      <div className="date-picker__weekdays" aria-hidden>
        {weekdays.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      <div className="date-picker__grid" role="grid" aria-label={lang === 'fr' ? 'Calendrier' : 'Calendar'}>
        {weeks.flat().map((day, i) => {
          if (!day) {
            return <span key={`empty-${i}`} className="date-picker__day is-empty" />;
          }
          const iso = toIsoDate(day);
          const isPast = startOfDay(day) < today;
          const isSelected = iso === value;
          const isToday = iso === toIsoDate(today);
          return (
            <button
              key={iso}
              type="button"
              role="gridcell"
              disabled={isPast}
              className={[
                'date-picker__day',
                isSelected ? 'is-selected' : '',
                isToday ? 'is-today' : '',
                isPast ? 'is-disabled' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => pickDay(day)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
