import type { VercelRequest, VercelResponse } from '@vercel/node';

import { TestEnum } from '@lingosta/common';
export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  response.status(200).json({
    body: "hi " + TestEnum.A,
    query: "there",
  });
}