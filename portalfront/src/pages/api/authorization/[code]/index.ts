import { NextApiRequest, NextApiResponse } from 'next';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default (req: NextApiRequest, res: NextApiResponse) => {
  (req.query.code)

  res.statusCode = 200;
  res.json({ name: 'John Doe', value: req.query.code });
};
