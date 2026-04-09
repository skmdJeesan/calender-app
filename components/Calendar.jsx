'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useMemo, useState, useEffect } from 'react';

const year = 2026;
const monthNames = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

const weekdayHeaders = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const monthImages = [
  'https://myholidayhappiness.com/uploads/manali_1140_400.jpg',
  'https://images.unsplash.com/photo-1610962895729-2975a9717fad?q=80&w=2156&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://plus.unsplash.com/premium_photo-1720798652866-084171feb852?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://www.tataneu.com/pages/travel/_next/image?url=https%3A%2F%2Fd1msew97rp2nin.cloudfront.net%2Fprodin%2Ftntravel%2Fblogimages%2Ffaqs-about-amer-fort-jaipur-history-attractions-more-1da349e0-3673-407e-bda4-907159913532.webp&w=3840&q=75',
  'https://www.fabhotels.com/blog/wp-content/uploads/2019/08/Spiti-Valley.jpg',
  'https://travel.rethinkways.com/wp-content/uploads/2025/12/215-almora.jpg',
  'https://www.fabhotels.com/blog/wp-content/uploads/2019/06/Kerala.jpg',
  'https://s7ap1.scene7.com/is/image/incredibleindia/independence-day-fes-hero?qlt=82&ts=1726639288095',
  'https://triptravel.vikartrtechnologies.com/storage/blogs/March2026/LwWN3Q3EFG3Yu8kz5QCL.webp',
  'https://blog-content.ixigo.com/wp-content/uploads/2019/09/Best-international-place-to-go-in-October-from-India..jpg',
  'https://hblimg.mmtcdn.com/content/hubble/img/destimg/mmt/destination/m_Manali_main_tv_destination_img_1_l_1021_1529.jpg',
  'https://www.wticabs.com:3001/global/app/v1/aws/getImage/blogimages/1741337763278_1733136290166_Places_to_Visit_in_India_during_December_with_WTicabs_Your_Guide_to_Winter_Getaways.jpg',
];

const holidays2026 = {
  '2026-01-01': "New Year's Day",
  '2026-01-19': 'Martin Luther King Jr. Day',
  '2026-02-16': 'Presidents Day',
  '2026-05-25': 'Memorial Day',
  '2026-06-19': 'Juneteenth',
  '2026-07-04': 'Independence Day',
  '2026-09-07': 'Labor Day',
  '2026-10-12': 'Columbus Day',
  '2026-11-11': 'Veterans Day',
  '2026-11-26': 'Thanksgiving Day',
  '2026-12-25': 'Christmas Day',
};

function formatIso(yearValue, monthValue, dayValue) {
  const paddedMonth = String(monthValue + 1).padStart(2, '0');
  const paddedDay = String(dayValue).padStart(2, '0');
  return `${yearValue}-${paddedMonth}-${paddedDay}`;
}

function buildCalendar(monthIndex) {
  const firstOfMonth = new Date(year, monthIndex, 1);
  const firstWeekday = (firstOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const previousMonthDays = new Date(year, monthIndex, 0).getDate();
  const totalCells = 42;
  const days = [];

  for (let i = 0; i < totalCells; i += 1) {
    const dayIndex = i - firstWeekday;
    if (dayIndex < 0) {
      const day = previousMonthDays + dayIndex + 1;
      const date = new Date(year, monthIndex - 1, day);
      days.push({ day, type: 'prev', date });
    } else if (dayIndex >= daysInMonth) {
      const day = dayIndex - daysInMonth + 1;
      const date = new Date(year, monthIndex + 1, day);
      days.push({ day, type: 'next', date });
    } else {
      const day = dayIndex + 1;
      const date = new Date(year, monthIndex, day);
      const weekday = date.getDay();
      const weekend = weekday === 0 || weekday === 6;
      days.push({ day, type: 'current', date, weekend });
    }
  }

  return days;
}

export default function Calendar() {
  const today = new Date();
  const [activeMonth, setActiveMonth] = useState(today.getMonth());
  const [selectedDateIso, setSelectedDateIso] = useState(
    formatIso(today.getFullYear(), today.getMonth(), today.getDate())
  );

  // preloading the images
  useEffect(() => {
    monthImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const calendarDays = useMemo(() => buildCalendar(activeMonth), [activeMonth]);
  const monthLabel = monthNames[activeMonth];
  const selectedHolidayName = selectedDateIso ? holidays2026[selectedDateIso] : null;

  const handleNav = (direction) => {
    setActiveMonth((current) => {
      const next = current + direction;
      return next < 0 ? 0 : next > 11 ? 11 : next;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-6xl bg-white shadow-xl overflow-hidden rounded-4xl border border-slate-200">

        <div className="top relative overflow-hidden rounded-3xl">

          <div className="relative w-full h-[35vh] sm:h-[45vh]">
            {monthImages.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={monthNames[i]}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                style={{ opacity: i === activeMonth ? 1 : 0 }}
              />
            ))}
          </div>

          <div className="absolute inset-x-0 bottom-0 h-15 bg-linear-to-t from-green-100 via-green-400/90 to-transparent" />

          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNav(-1)}
              disabled={activeMonth === 0}
              className="rounded-full bg-white/90 text-slate-700 shadow-sm border border-slate-200 p-2 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            ><ArrowLeft /></button>
            <button
              type="button"
              onClick={() => handleNav(1)}
              disabled={activeMonth === 11}
              className="rounded-full bg-white/90 text-slate-700 shadow-sm border border-slate-200 p-2 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
            ><ArrowRight /></button>
          </div>

          <div className="absolute right-4 bottom-2 sm:right-8 sm:bottom-1 text-right text-white z-10">
            <div className="text-xl sm:text-3xl font-bold tracking-widest uppercase opacity-90 text-green-400">{year}</div>
            <div className="text-4xl sm:text-6xl font-bold tracking-tight uppercase leading-none text-green-200">{monthLabel}</div>
          </div>
        </div>

        <div className="down grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 p-4 sm:p-8 bg-white w-full">
          <div className='calendar'>
            <div className="grid grid-cols-7 gap-1 sm:gap-3 text-center mb-4">
              {weekdayHeaders.map((day, i) => (
                <div key={day}
                  className={`text-sm font-semibold tracking-widest uppercase ${i >= 6 ? 'text-green-600' : 'text-slate-500'}`}
                >{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-3">
              {calendarDays.map((item) => {
                const isoDate = formatIso(item.date.getFullYear(), item.date.getMonth(), item.date.getDate());
                const isHoliday = Boolean(holidays2026[isoDate]);
                const isSelected = selectedDateIso === isoDate;
                const isCurrentMonth = item.type === 'current';
                const isSunday = isCurrentMonth && item.date.getDay() === 0;

                let bgColor = 'bg-white';
                let textColor = isCurrentMonth ? 'text-slate-900' : 'text-slate-400';
                let borderColor = 'border-slate-200';

                if (isHoliday || isSunday) {
                  bgColor = 'bg-green-500';
                  textColor = 'text-white';
                }
                if (isSelected) {
                  bgColor = 'bg-yellow-400';
                  textColor = 'text-slate-900';
                  borderColor = 'border-yellow-500 shadow-[0_10px_20px_rgba(255,193,7,0.18)]';
                }

                const opacity = isCurrentMonth ? 'opacity-100' : 'opacity-40';

                return (
                  <button
                    key={isoDate}
                    type="button"
                    onClick={() => item.type === 'current' && setSelectedDateIso(isoDate)}
                    className={`group h-10 sm:h-12 w-10 sm:w-14 rounded-xl border ${borderColor} ${bgColor} ${opacity} transition hover:border-slate-300`}
                    disabled={!isCurrentMonth}
                  >
                    <div className="flex h-full flex-col items-center justify-center gap-1 p-2">
                      <span className={`text-sm font-semibold ${textColor}`}>{item.day}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="notes">
            <div className="flex items-center justify-between mb-5">
              <p className="text-xl font-semibold uppercase tracking-normal text-slate-500">Notes</p>
              <div className="rounded-full bg-green-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-normal text-white shadow-sm">
                {monthNames[activeMonth].slice(0, 3)}
              </div>
            </div>
            <div>
              <textarea
                className="h-40 rounded-xl p-4 sm:p-6 border border-slate-200 bg-slate-100 w-full outline-none resize-none font-semibold"
                placeholder="what's your plan for today? 💭"
              />
            </div>
            {selectedDateIso && (
              <div className="mt-4 rounded-3xl bg-slate-200 p-4 sm:p-5 text-sm text-slate-700 shadow-sm">
                <div className="text-slate-500 uppercase tracking-widest text-[11px] mb-2">Selected Date</div>
                <div className="text-lg font-semibold text-slate-900">{selectedDateIso}</div>
                {selectedHolidayName ? (
                  <div className="mt-2 text-green-700 font-semibold">Holiday: {selectedHolidayName}</div>
                ) : (
                  <div className="mt-2 text-slate-500">Regular day</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}