// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const fs = require('fs');

type Data = {
  filename: string
}

const exportGeojsonHandler = (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {

  const timestamp = Date.now()
  const filename = `${timestamp}_boundary.json`

  fs.writeFileSync(`out/${filename}`, JSON.stringify(req.body))
  res.status(200).json(
    { 
      filename: filename
    }
  )
}

export default exportGeojsonHandler;