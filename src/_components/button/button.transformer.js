const defaults = {
  theme: "blue"
}

module.exports = ({ __keywords, label, theme, url, ...props }) => {
  const attrs = Object.entries(props)
    .map(([k, v]) => `${k}=${v}`)
    .join(" ")

  return {
    attrs: attrs,
    label: label,
    theme: theme || defaults.theme,
    url: url
  }
}
