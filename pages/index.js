import Head from 'next/head';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Fuera Del Camino - Bedevaart naar goede wijn</title>
        <meta name="description" content="Wijnproeftool voor wijnclub Fuera Del Camino" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-wijn-donkergroen mb-2">Fuera Del Camino</h1>
          <p className="text-xl text-wijn-rood">Bedevaart naar goede wijn</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card">
            <h2 className="section-title">Nieuwe Wijn Proeven</h2>
            <p className="mb-4">Voeg een nieuwe wijnproefnotitie toe volgens de WSET-methode.</p>
            <a href="/proeven" className="btn-primary inline-block">Nieuwe Proefnotitie</a>
          </div>
          
          <div className="card">
            <h2 className="section-title">Wijnbibliotheek</h2>
            <p className="mb-4">Bekijk alle geproefde wijnen in onze database.</p>
            <a href="/wijnen" className="btn-primary inline-block">Bekijk Wijnen</a>
          </div>
        </div>

        <div className="card">
          <h2 className="section-title">Over Onze Wijnclub</h2>
          <p className="mb-4">
            Fuera Del Camino is een wijnclub voor liefhebbers die samen op ontdekkingstocht gaan naar bijzondere wijnen. 
            Onze naam, "Buiten het Pad" in het Spaans, weerspiegelt onze filosofie: we verkennen wijnen die buiten de gebaande paden liggen.
          </p>
          <p>
            Met onze WSET-gebaseerde proeftool houden we systematisch bij welke wijnen we hebben geproefd, 
            delen we onze bevindingen, en bouwen we samen een waardevolle database op van wijnkennis.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
