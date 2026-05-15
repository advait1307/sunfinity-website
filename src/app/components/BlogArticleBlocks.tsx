import type { BlogBlock } from '../data/blog/types'

export default function BlogArticleBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="blog-article-body space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={i} className="text-stone-700 text-[1.0625rem] leading-[1.8]">
                {block.text}
              </p>
            )
          case 'heading':
            return (
              <h2
                key={i}
                className="text-xl md:text-2xl font-bold text-stone-900 pt-4 first:pt-0 scroll-mt-28"
              >
                {block.text}
              </h2>
            )
          case 'subheading':
            return (
              <h3 key={i} className="text-lg md:text-xl font-semibold text-stone-900 pt-2">
                {block.text}
              </h3>
            )
          case 'bulletList':
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 text-stone-700 text-[1.0625rem] leading-[1.75] marker:text-[#ed8416]">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            )
          case 'code':
            return (
              <pre
                key={i}
                className="bg-stone-100/90 border border-stone-200 rounded-xl p-4 md:p-5 text-[0.8125rem] md:text-sm leading-relaxed font-mono text-stone-800 overflow-x-auto shadow-inner"
              >
                <code className="whitespace-pre-wrap break-words">{block.content.trim()}</code>
              </pre>
            )
          case 'table':
            return (
              <figure key={i} className="my-8 overflow-x-auto rounded-xl border border-stone-200 bg-white shadow-sm">
                {block.caption && (
                  <figcaption className="px-4 py-2 text-xs font-medium text-stone-500 bg-stone-50 border-b border-stone-200">
                    {block.caption}
                  </figcaption>
                )}
                <table className="w-full min-w-[32rem] text-left text-sm text-stone-800">
                  <thead>
                    <tr className="bg-stone-100 border-b border-stone-200">
                      {block.headers.map((h, j) => (
                        <th key={j} className="px-4 py-3 font-semibold text-stone-900 align-top">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, ri) => (
                      <tr key={ri} className="border-b border-stone-100 last:border-b-0">
                        {row.map((cell, ci) => (
                          <td key={ci} className="px-4 py-3 align-top text-stone-700">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </figure>
            )
          case 'callout':
            return (
              <aside
                key={i}
                className="border-l-4 border-[#ed8416] bg-gradient-to-r from-orange-50/80 to-transparent pl-5 pr-4 py-4 rounded-r-lg text-stone-800 text-[1.0625rem] leading-[1.75]"
              >
                {block.text}
              </aside>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
