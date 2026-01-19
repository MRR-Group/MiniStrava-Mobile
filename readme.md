# MiniStrava

Mobile-first fitness tracker (Android/iOS) z panelem administracyjnym i REST API. Rejestruje biegi, jazdy i spacery z GPS, pokazuje statystyki i rankingi, eksportuje trasy oraz pozwala adminowi zarządzać użytkownikami i aktywnościami.

## Stos technologiczny
- React Native (Expo) + TailwindCSS

## Kluczowe funkcje
- Rejestracja trasy z GPS (działanie w tle), historia, mapy, tempo/dystans, nazwy/notatki/zdjęcia, eksport GPX/CSV
- Profile użytkowników, zmiana/reset hasła, statystyki i tygodniowe rankingi
- Panel admina do przeglądania i moderacji aktywności/użytkowników, statystyki globalne
- Dwujęzyczność (PL/EN), tryb offline z synchronizacją po odzyskaniu sieci

## Szybki start (aplikacja mobilna)
```bash
npm install
npx expo start
```