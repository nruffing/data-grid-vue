module.exports = {
  filter,
  target,
  root: true,
  workspaces: ["vuepress", "dev-app"],
  format: "group",
}

const allowNewestPatterns = [
  /vuepress/,
  /^typedoc-plugin-markdown$/,
]

function filter(name, semver) {
  if (name === '@types/node') {
    // lock to node 18
    return semver[0].major === 18
  }
  return true
}

function target(name, semver) {
  if (allowNewestPatterns.some(pattern => pattern.test(name))) {
    return 'newest'
  }
  return 'latest'
}