import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.join(process.cwd(), 'public', 'banners.json');
  if (fs.existsSync(filePath)) {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const banners = JSON.parse(jsonData);
    res.status(200).json(banners);
  } else {
    res.status(404).json({ message: 'Banners not found' });
  }
}
