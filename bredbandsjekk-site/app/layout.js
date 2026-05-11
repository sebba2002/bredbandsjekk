import './globals.css';

export const metadata = {
  title: 'Bredbåndsjekk.no | Gratis bredbåndssjekk',
  description: 'Sjekk hvilke bredbåndsmuligheter som kan være aktuelle på adressen din. Gratis og uforpliktende.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
