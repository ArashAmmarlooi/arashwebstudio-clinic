import { useMemo, useState } from 'react';
import { BrandedImage } from '../components/BrandedImage';
import { DatePicker } from '../components/DatePicker';
import { useApp } from '../context/AppContext';
import { images, services, team, timeSlots, type ServiceSlug } from '../data/site';
import { t, getServiceCopy } from '../i18n/translations';
import { useGsapReveal } from '../hooks/useGsapReveal';
import { formatAppointmentDate, toIsoDate } from '../lib/dateUtils';
import './BookPage.css';

type Step = 1 | 2 | 3 | 4;

export function BookPage() {
  const { lang } = useApp();
  const [step, setStep] = useState<Step>(1);
  const [service, setService] = useState<ServiceSlug>('physiotherapy');
  const [specialist, setSpecialist] = useState('any');
  const [date, setDate] = useState(() => toIsoDate(new Date()));
  const [time, setTime] = useState('10:30');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState(false);

  useGsapReveal('.reveal', [lang, step]);

  const serviceCopy = getServiceCopy(service, lang);
  const specialistName = useMemo(() => {
    if (specialist === 'any') {
      return lang === 'fr' ? 'Premier disponible' : 'Any available specialist';
    }
    const m = team.find((x) => x.id === specialist);
    return m ? m.name[lang] : '';
  }, [specialist, lang]);

  const saveBooking = () => {
    const payload = {
      service,
      specialist,
      date,
      time,
      name,
      email,
      phone,
      createdAt: new Date().toISOString(),
    };
    const key = 'clinique-elan-bookings';
    const prev = JSON.parse(localStorage.getItem(key) ?? '[]') as unknown[];
    localStorage.setItem(key, JSON.stringify([payload, ...prev]));
    setDone(true);
  };

  const steps = [
    t('stepService', lang),
    t('stepSpecialist', lang),
    t('stepDate', lang),
    t('stepDetails', lang),
  ];

  return (
    <section className="book section-pad">
      <div className="container book-hero reveal">
        <p className="eyebrow eyebrow-line">{t('bookEyebrow', lang)}</p>
        <h1 className="display">{t('bookTitle', lang)}</h1>
        <ol className="book-steps">
          {steps.map((label, i) => (
            <li key={label} className={step === i + 1 ? 'active' : step > i + 1 ? 'done' : ''}>
              <span>({i + 1})</span> {label}
            </li>
          ))}
        </ol>
      </div>

      {done ? (
        <div className="container card book-success reveal">
          <p>{t('success', lang)}</p>
        </div>
      ) : (
        <div className="container book-layout">
          <div className="book-form card reveal">
            {step === 1 && (
              <label>
                {t('stepService', lang)}
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value as ServiceSlug)}
                >
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {getServiceCopy(s.slug, lang).title}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {step === 2 && (
              <label>
                {t('stepSpecialist', lang)}
                <select value={specialist} onChange={(e) => setSpecialist(e.target.value)}>
                  <option value="any">
                    {lang === 'fr' ? 'Premier disponible' : 'Any available specialist'}
                  </option>
                  {team.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name[lang]}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {step === 3 && (
              <>
                <p className="book-form__section-label">
                  {lang === 'fr' ? 'Choisir une date' : 'Select a date'}
                </p>
                <DatePicker value={date} onChange={setDate} lang={lang} />
                <p className="book-form__section-label">
                  {lang === 'fr' ? 'Choisir une heure' : 'Select a time'}
                </p>
                <div className="time-grid">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={time === slot ? 'active' : ''}
                      onClick={() => setTime(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <label>
                  {lang === 'fr' ? 'Nom complet' : 'Full name'}
                  <input value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                  {lang === 'fr' ? 'Courriel' : 'Email'}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label>
                  {lang === 'fr' ? 'Téléphone' : 'Phone'}
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </label>
              </>
            )}

            <div className="book-form__actions">
              {step > 1 && (
                <button type="button" className="btn btn-outline" onClick={() => setStep((s) => (s - 1) as Step)}>
                  {lang === 'fr' ? 'Retour' : 'Back'}
                </button>
              )}
              {step < 4 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setStep((s) => (s + 1) as Step)}
                >
                  {t('continue', lang)} →
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={saveBooking}
                  disabled={!name || !email}
                >
                  {t('confirm', lang)} →
                </button>
              )}
            </div>
          </div>

          <aside className="book-summary card reveal">
            <h2>{lang === 'fr' ? 'Détails du rendez-vous' : 'Appointment details'}</h2>
            <BrandedImage
              src={images.booking}
              alt=""
              className="book-summary__img"
            />
            <ul>
              <li>{serviceCopy.title}</li>
              <li>{specialistName}</li>
              <li>{formatAppointmentDate(date, lang)}</li>
              <li>{time}</li>
              <li>45 min</li>
            </ul>
          </aside>
        </div>
      )}
    </section>
  );
}
