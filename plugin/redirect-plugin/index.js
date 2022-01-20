module.exports = {
  onPreBuild: ({ netlifyConfig }) => {
    netlifyConfig.redirects.push({
      from: '/',
      to: 'https://outlier.org',
      status: 302
    })
    console.log(netlifyConfig, 'netlify config')
  }
}
