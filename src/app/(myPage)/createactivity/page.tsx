'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { createActions } from './_actions/createActions';
import Form from 'next/form';

const initialState = {
  message: '',
};

export default function Page() {
  const [state, formAction] = useFormState(createActions, initialState);
  const [schedule, setSchedule] = useState([{ date: '', start: '', end: '' }]);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [introImages, setIntroImages] = useState<File[]>([]);

  const handleAddSchedule = () => {
    setSchedule([...schedule, { date: '', start: '', end: '' }]);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">내 체험 등록</h1>
      <Form action={formAction} className="space-y-4">
        <input
          name="title"
          placeholder="제목"
          className="input-field"
          required
        />
        <select name="category" className="input-field" required>
          <option value="">카테고리</option>
          <option value="dance">댄스</option>
          <option value="art">미술</option>
          <option value="cooking">요리</option>
        </select>
        <textarea
          name="description"
          placeholder="설명"
          className="input-field h-32"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="가격"
          className="input-field"
          required
        />
        <input
          name="address"
          placeholder="주소"
          className="input-field"
          required
        />

        <div className="space-y-2">
          <h2 className="text-lg font-semibold">예약 가능한 시간대</h2>
          {schedule.map((slot, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="date"
                name={`schedule[${index}][date]`}
                className="input-field w-1/3"
                required
              />
              <input
                type="time"
                name={`schedule[${index}][start]`}
                className="input-field w-1/4"
                required
              />
              <input
                type="time"
                name={`schedule[${index}][end]`}
                className="input-field w-1/4"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSchedule}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            +
          </button>
        </div>
        <SubmitButton />
        {state.message && <p className="text-red-500">{state.message}</p>}
      </Form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="bg-black text-white px-4 py-2 rounded">
      {pending ? '등록 중...' : '등록하기'}
    </button>
  );
}
