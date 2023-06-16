import { NextApiRequest, NextApiResponse } from "next";

export interface AiDetectBody {
  text: string;
}

export interface AiDetectResults {
  error?: string;
  score?: number; // 0.0=human, 1.0=ai
  sentence_scores?: {
    sentence: string;
    score: number; // 0.0=human, 1.0=ai
  };
}

const key = process.env.SAPLING_API_KEY!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { text }: AiDetectBody = JSON.parse(req.body);
  const saplingRes = await fetch("https://api.sapling.ai/api/v1/aidetect", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, text, sent_scores: false }),
  });
  const resBody = saplingRes.ok
    ? { ...(await saplingRes.json()) }
    : { error: await saplingRes.text() };
  res.status(saplingRes.status).json(resBody);
}
