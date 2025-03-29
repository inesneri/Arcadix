# **PROPOSTA DI CONSEGNA**

## **Descrizione**
Arcadix è una piattaforma online che offre un'esperienza immersiva nel mondo dei videogiochi. Gli utenti possono navigare attraverso una vasta selezione di giochi, esplorare i dettagli di ciascuno e, se autenticati, interagire attivamente con essi. Gli utenti registrati hanno la possibilità di scrivere recensioni sui giochi, aggiungerli alla loro lista dei preferiti e partecipare alla chat live. Il sistema utilizza l'API di Rawg.io per il recupero delle informazioni sui giochi e Supabase come database per gestire i dati relativi agli utenti, alle recensioni e ai messaggi.

## **API**

- [rawg.io](https://rawg.io/apidocs)
- [Supabase](https://supabase.io/)

## **Stile**
Il progetto è realizzato con un design semplice e funzionale, utilizzando principalmente il CSS puro per lo stile. Per ottenere un layout minimalista, sono stati integrati componenti da Pico.css. Inoltre, per arricchire l'interfaccia utente, sono stati utilizzati strumenti come SweetAlert2 per le notifiche, React-Icons per le icone e Material UI per gli elementi UI, che contribuiscono a un'esperienza utente fluida e moderna.

## **Pagine**

- **Homepage**: La pagina principale che mostra i giochi più recenti e quelli di tendenza, dando agli utenti un'anteprima delle novità.
- **Pagina dettaglio del gioco**: Una pagina dedicata a ogni gioco che fornisce una panoramica completa, inclusi dettagli come descrizione, rating, immagini e piattaforme.
- **Signup/Login**: Pagina per consentire agli utenti di registrarsi e fare login con email e password per accedere alle funzionalità avanzate della piattaforma.
- **Pagina dell'account utente**: Una dashboard dove gli utenti possono visualizzare e gestire il proprio profilo, le recensioni scritte e i giochi aggiunti ai preferiti.
- **Pagine di ricerca**: Consentono agli utenti di cercare giochi specifici utilizzando una barra di ricerca e applicando filtri per genere, piattaforma e altre caratteristiche.
- **Chat live (solo per utenti autenticati)**: Una sezione di chat in tempo reale visibile esclusivamente agli utenti loggati, che possono inviare e ricevere messaggi relativi ai giochi.

## **User Interactions**

- **Utente non autenticato**:
  - Può navigare tra i giochi, visualizzare i dettagli ed esplorare le varie informazioni.
  - Può registrarsi utilizzando il proprio nome, email e password per creare un account.
- **Utente autenticato**:
  - Ha accesso alla propria dashboard, dove può gestire le proprie informazioni e preferenze.
  - Può scrivere recensioni per i giochi che ha provato.
  - Può aggiungere giochi alla propria lista dei preferiti per tenerli sotto controllo.
  - Può partecipare alla chat live del gioco se loggato.

## **Context**
Il contesto dell'applicazione è gestito tramite due componenti principali:

- **SessionContext**: Si occupa di mantenere e gestire lo stato della sessione utente in tutta l'applicazione. Permette ai componenti di accedere ai dati dell'utente autenticato.
- **SessionProvider**: Fornisce il contesto a tutti i componenti della piattaforma, assicurando che ogni parte dell'applicazione sia sempre aggiornata sullo stato dell'autenticazione dell'utente e sulle informazioni correlate.

## **Deployment**
[Arcadix](https://arcadix-git-main-ines-nheris-projects.vercel.app)

