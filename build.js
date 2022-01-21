const token = process.env.DATO_TOKEN || '61a51e9e1c16f4e972ea78180c2033'
const url = 'https://graphql.datocms.com/'
const superagent = require('superagent')
const fs = require('fs')

const datoFetch = async (query, variables) => {
  const result = await superagent
    .post(url)
    .send({ query, ...(variables && { variables }) })
    .set('Content-Type', 'application/json')
    .set('authorization', `Bearer ${token}`)

  return result.body.data
}

function fetchfiles (config) {
  const query = `{
    allCourseDownloads {
      id
      file {
        id
        url
      }
      slug
    }
  }`

  return datoFetch(query, {}, config)
}

async function createRedirects () {
  const { allCourseDownloads } = await fetchfiles()
  console.log(allCourseDownloads, 'all course downloads')
  let data = ''
  allCourseDownloads.length && allCourseDownloads.forEach(courseDownload => {
    const { slug, file: { url } } = courseDownload
    data += `/${slug} ${url} 302\n`
  })
  fs.writeFileSync('./_redirects', data)
}

createRedirects()
