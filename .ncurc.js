module.exports = {
  filter,
  target,
  root: true,
  workspaces: ["vuepress", "dev-app"],
  format: "group",
}

function filter(name, semver) {
  if (name === '@types/node') {
    // lock to node 18
    return semver[0].major === 18
  }
  return true
}

function target(name, semver) {
  // allow pre-releases for vuepress
  if (name.includes('vuepress')) {
    return 'newest'
  }
  return 'latest'
}