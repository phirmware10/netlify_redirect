require('dotenv').config()
const superagent = require('superagent')
const url = 'https://graphql.datocms.com/'

const datoFetch = async (query, variables, config) => {
  const { token } = config
  const result = await superagent
    .post(url)
    .send({ query, ...(variables && { variables }) })
    .set('Content-Type', 'application/json')
    .set('authorization', `Bearer ${token}`)

  return result.body.data
}

module.exports = {
  onPreBuild: async ({ netlifyConfig }) => {
    const { build: { environment } } = netlifyConfig

    const config ={ token: environment.token || process.env.DATO_TOKEN }
    const { allCourseDownloads } = await fetchfiles(config)
    allCourseDownloads.length && allCourseDownloads.forEach(courseDownload => {
      const { slug, file: { url } } = courseDownload
      netlifyConfig.redirects.push({
        from: `/${slug}`,
        to: url,
        status: 302
      })
    })
    console.log(netlifyConfig, 'netlify config')
  }
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
