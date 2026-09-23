import type { Metadata, Viewport } from 'next';
import './globals.css';
export const metadata: Metadata = { title: '鑑定クエスト｜この街の、まだ見ぬ価値を。', description: '土地の精霊とともに調査・判断・基準復習を進める2D鑑定ゲーム。', appleWebApp: { capable: true, title: '鑑定クエスト', statusBarStyle: 'black' } };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#11191b' };
export default function Layout({children}: Readonly<{children:React.ReactNode}>) { return <html lang="ja"><body>{children}</body></html>; }
