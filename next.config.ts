import type { NextConfig } from 'next';

const isPagesExport = process.env.PAGES_EXPORT === '1';

const nextConfig: NextConfig = isPagesExport
  ? {
      output: 'export',
      basePath: process.env.PAGES_BASE_PATH || '',
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
