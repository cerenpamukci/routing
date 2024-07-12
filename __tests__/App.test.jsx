import { beforeEach, expect, test } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from '../App';
import fs from 'fs';
import path from 'path';

const app = fs
  .readFileSync(path.resolve(__dirname, '../App.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

const film = fs
  .readFileSync(path.resolve(__dirname, '../components/Film.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

beforeEach(() => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});

test('Program hatasız bir şekilde çalışıyor', () => {
  screen.getByText(/Kaydedilen Filmler/i);
});

test("App.jsx'de 2 tane state tanımlanmış", () => {
  const parts = app.split('=useState(');
  expect(parts).toHaveLength(3);
});

test('Kaydedilmiş filmler listesi için App.jsx başlangıç değeri [] olan bir state tanımlanmış', () => {
  expect(app.includes('=useState([])')).toBe(true);
});

test("sahteVeri'deki movies, film listesi state'ine başlangıç değeri olarak tanımlanmış", () => {
  expect(app.includes('=useState(movies)')).toBe(true);
});

test('Ana sayfada tüm filmler listeleniyor', () => {
  screen.getByText(/The Godfather/i);
  screen.getByText(/Star Wars/i);
  screen.getByText(/The Lord of the Ring/i);
  screen.getByText(/Terminator 2: Judgement Day/i);
  screen.getByText(/Dumb and Dumber/i);
  screen.getByText(/Tombstone/i);
});

test("App.jsx'de Switch kullanılmış", () => {
  expect(app.includes('<Switch>')).toBe(true);
});

test("App.jsx'de route'da exact kullanılmış", () => {
  expect(app.includes('exact')).toBe(true);
});

test("filmler/:id route'u çalışıyor", async () => {
  fireEvent.click(screen.getByText(/The Godfather/i));
  await screen.findByText(/Marlon Brando/i);
});

test('AnaSayfa butonu çalışıyor', async () => {
  fireEvent.click(screen.getByText(/The Godfather/i));
  await screen.findByText(/Marlon Brando/i);
  fireEvent.click(screen.getByText(/Anasayfa/i));
  await screen.findByText(/Star Wars/i);
});

test('Kaydet butonu çalışıyor', async () => {
  fireEvent.click(screen.getByText(/The Godfather/i));
  await screen.findByText(/Marlon Brando/i);
  fireEvent.click(screen.getByText(/Kaydet/i));
  const filmNames = await screen.findAllByText(/The Godfather/i);
  expect(filmNames).toHaveLength(2);
});

test('Kaydet butonu aynı filmi 2. kez kaydetmiyor', async () => {
  fireEvent.click(screen.getByText(/The Godfather/i));
  await screen.findByText(/Marlon Brando/i);
  fireEvent.click(screen.getByText(/Kaydet/i));
  fireEvent.click(screen.getByText(/Kaydet/i));
  const filmNames = await screen.findAllByText(/The Godfather/i);
  expect(filmNames).toHaveLength(2);
});
