/**
 * Looks through all links on the page. If the link is determined to be
 * external, it adds target="_blank" and rel="noopener" attributes to the anchor
 * tag.
 */
onInit(() => {
  const links = document.getElementsByTagName("a")

  for (let link of links) {
    if (link.hostname.length && location.hostname !== link.hostname) {
      link.setAttribute("target", "_blank")
      link.setAttribute("rel", "noopener")
    }
  }
})
