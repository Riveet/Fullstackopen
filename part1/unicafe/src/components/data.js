export const data = [
  {
    name: 'Guy',
    country: 'Free city',
    tags: ['free', 'cool', 'AI'],
  },
]

const moreData = data.map((item) => {
  const match = item.tags.filter((p) => {
    if (p === 'AI') {
      console.log(p)
      return p
    }
  })
  if (match) {
    return [item.country, item.name]
  }
})

console.log(moreData)
