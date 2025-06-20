import fs from 'fs'
import path from 'path'

function walkDirTree(dir, baseDir) {
  const result = {}
  const list = fs.readdirSync(dir)
  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat && stat.isDirectory()) {
      result[file] = walkDirTree(filePath, baseDir)
    } else {
      const relPath = path.relative(baseDir, filePath).replace(/\\/g, '/')
      result[file] = `../img/${relPath}`
    }
  })
  return result
}

const imgBase = path.join(process.cwd(), 'public', 'img')
const macanDir = path.join(imgBase, 'Macan')
const taycanDir = path.join(imgBase, 'Taycan')

const macanTree = walkDirTree(macanDir, imgBase)
const taycanTree = walkDirTree(taycanDir, imgBase)

fs.writeFileSync(
  'macanTree.json',
  JSON.stringify({ macan: macanTree }, null, 2),
  'utf-8'
)
fs.writeFileSync(
  'taycanTree.json',
  JSON.stringify({ taycan: taycanTree }, null, 2),
  'utf-8'
)

console.log(
  '已生成 macanTree.json 與 taycanTree.json（巢狀結構且檔案為相對路徑）'
)
