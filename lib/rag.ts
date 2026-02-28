export interface Chunk {
  text: string
  source: string
}

export function chunkText(
  text: string,
  source: string,
  maxChunkSize: number = 500
): Chunk[] {
  const paragraphs = text.split(/\n\n+/)
  const chunks: Chunk[] = []
  let currentChunk = ''

  for (const paragraph of paragraphs) {
    if (
      (currentChunk + '\n\n' + paragraph).length > maxChunkSize &&
      currentChunk
    ) {
      chunks.push({ text: currentChunk.trim(), source })
      currentChunk = paragraph
    } else {
      currentChunk = currentChunk
        ? currentChunk + '\n\n' + paragraph
        : paragraph
    }
  }

  if (currentChunk.trim()) {
    chunks.push({ text: currentChunk.trim(), source })
  }

  return chunks
}

export function simpleSearch(
  query: string,
  chunks: Chunk[],
  topK: number = 5
): Chunk[] {
  const queryTerms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 2)

  const scored = chunks.map((chunk) => {
    const text = chunk.text.toLowerCase()
    let score = 0
    for (const term of queryTerms) {
      const regex = new RegExp(term, 'gi')
      const matches = text.match(regex)
      if (matches) {
        score += matches.length
      }
    }
    if (text.includes(query.toLowerCase())) {
      score += 10
    }
    return { chunk, score }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map((s) => s.chunk)
}
