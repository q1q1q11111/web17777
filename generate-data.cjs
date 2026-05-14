const fs = require('fs');
const path = require('path');

const srcBase = 'C:/Users/14924/AppData/Local/Temp/wincompress/{B29276D3-6026-489A-A0B5-0023C8DA5769}/data';
const outBase = 'C:/Users/14924/WorkBuddy/20260514082258/shangcheng-zhengxie/src/data';

// Read original JSON
const data = JSON.parse(fs.readFileSync(path.join(srcBase, '5. \u59D4\u5458\u5C65\u804C\u5E73\u53F0/5\u5C65\u804C\u5E73\u53F0.json'), 'utf-8'));

// Map studios with images
const imgDir = path.join(srcBase, '5. \u59D4\u5458\u5C65\u804C\u5E73\u53F0');
fs.readdirSync(imgDir).filter(f => f.endsWith('.webp') && !f.startsWith('\u4E4B\u524D')).forEach(f => {
  const num = f.match(/^(\d+)/);
  if (num) {
    const id = parseInt(num[1]);
    const studio = data.studios.find(s => s.id === id);
    if (studio) studio.image = '/images/studios/' + f;
  }
});

// Center images
const centerDir = path.join(srcBase, '4. \u5E02\u653F\u534F\u65B0\u65F6\u4EE3\u534F\u5546\u6C11\u4E3B\u5B9E\u8DF5 - \u4E0A\u57CE\u5206\u4E2D\u5FC3/\u5206\u4E2D\u5FC3');
const centerFiles = fs.readdirSync(centerDir).filter(f => f.endsWith('.webp'));
const pbImages = centerFiles.filter(f => f.charCodeAt(0) === 0x5F6D).sort().map(f => '/images/center/' + f);
const zyImages = centerFiles.filter(f => f.charCodeAt(0) === 0x7D2B).sort().map(f => '/images/center/' + f);

// Jiebier photos
const jbBase = path.join(srcBase, '3. \u754C\u522B\u57FA\u672C\u60C5\u51B5/\u6D3B\u52A8\u7167\u7247');
const jbFolders = fs.readdirSync(jbBase).filter(f => fs.statSync(path.join(jbBase, f)).isDirectory()).sort();
const jiebierPhotoMap = {};
jbFolders.forEach(folder => {
  const fp = path.join(jbBase, folder);
  const files = fs.readdirSync(fp).filter(f => f.endsWith('.webp')).sort();
  if (files.length > 0) {
    jiebierPhotoMap[folder] = files.map(file => '/images/jiebier/' + folder + '/' + file);
  }
});

// Build studios.js
let out = 'export const studioData = ' + JSON.stringify(data, null, 2) + ';\n\n';

out += 'export const jiebierData = [\n';
const jbInfo = [
  [1, '\u4E2D\u5171\u754C\u522B', 20, '\u5145\u5206\u53D1\u6325\u4E2D\u5171\u515A\u5458\u59D4\u5458\u7684\u5173\u952E\u5C11\u6570\u4F5C\u7528\uFF0C\u7262\u56FA\u6811\u7ACB\u515A\u5458\u59D4\u5458\u5C65\u804C\u8981\u66F4\u5148\u8FDB\u7406\u5FF5\uFF0C\u5E26\u5934\u5C65\u884C\u597D\u8C03\u67E5\u7814\u7A76\u3001\u53C2\u653F\u8BAE\u653F\u804C\u8D23\uFF0C\u670D\u52A1\u4E2D\u5FC3\u5927\u5C40\u3002'],
  [2, '\u65E0\u515A\u6D3E\u754C\u522B', 12, '\u51DD\u805A\u65E0\u515A\u6D3E\u4EBA\u58EB\u667A\u6167\u529B\u91CF\uFF0C\u79EF\u6781\u53C2\u653F\u8BAE\u653F\u3001\u5EFA\u8A00\u732E\u7B56\u3002'],
  [3, '\u5171\u9752\u56E2\u3001\u9752\u8054\u754C\u522B', 8, '\u5173\u6CE8\u9752\u5E74\u6210\u957F\u53D1\u5C55\uFF0C\u642D\u5EFA\u9752\u5E74\u53C2\u653F\u8BAE\u653F\u5E73\u53F0\u3002'],
  [4, '\u5DE5\u4F1A\u754C\u522B', 8, '\u7EF4\u62A4\u804C\u5DE5\u5408\u6CD5\u6743\u76CA\uFF0C\u63A8\u52A8\u6784\u5EFA\u548C\u8C10\u52B3\u52A8\u5173\u7CFB\u3002'],
  [5, '\u5987\u8054\u754C\u522B', 8, '\u5173\u6CE8\u5987\u5973\u513F\u7AE5\u53D1\u5C55\uFF0C\u4FC3\u8FDB\u5BB6\u5EAD\u548C\u8C10\u4E0E\u793E\u4F1A\u6587\u660E\u8FDB\u6B65\u3002'],
  [6, '\u5DE5\u5546\u8054\u754C\u522B', 10, '\u4FC3\u8FDB\u6C11\u8425\u7ECF\u6D4E\u5065\u5EB7\u53D1\u5C55\uFF0C\u4F18\u5316\u8425\u5546\u73AF\u5883\u3002'],
  [7, '\u79D1\u6280\u3001\u79D1\u534F\u754C\u522B', 8, '\u63A8\u52A8\u79D1\u6280\u521B\u65B0\u4E0E\u6210\u679C\u8F6C\u5316\uFF0C\u670D\u52A1\u65B0\u8D28\u751F\u4EA7\u529B\u53D1\u5C55\u3002'],
  [8, '\u4FA8\u3001\u53F0\u754C\u522B', 8, '\u53D1\u6325\u6865\u6881\u7EBD\u5E26\u4F5C\u7528\uFF0C\u4FC3\u8FDB\u6D77\u5185\u5916\u4EA4\u6D41\u5408\u4F5C\u3002'],
  [9, '\u65B0\u95FB\u6587\u4F53\u754C\u522B', 6, '\u4F20\u64AD\u6B63\u80FD\u91CF\uFF0C\u63A8\u52A8\u6587\u5316\u7E41\u8363\u53D1\u5C55\u3002'],
  [10, '\u7ECF\u6D4E\u754C\u522B', 14, '\u805A\u7126\u7ECF\u6D4E\u9AD8\u8D28\u91CF\u53D1\u5C55\uFF0C\u56F4\u7ED5\u4EA7\u4E1A\u5347\u7EA7\u7B49\u91CD\u5927\u8BAE\u9898\u5EFA\u8A00\u732E\u7B56\u3002'],
  [11, '\u73AF\u5883\u8D44\u6E90\u548C\u519C\u4E1A\u754C\u522B', 6, '\u63A8\u52A8\u751F\u6001\u6587\u660E\u5EFA\u8BBE\uFF0C\u52A9\u529B\u7EFF\u8272\u4F4E\u78B3\u53D1\u5C55\u3002'],
  [12, '\u6559\u80B2\u754C\u522B', 10, '\u5173\u6CE8\u6559\u80B2\u516C\u5E73\u4E0E\u8D28\u91CF\u63D0\u5347\uFF0C\u63A8\u52A8\u6559\u80B2\u6539\u9769\u521B\u65B0\u3002'],
  [13, '\u533B\u536B\u754C\u522B', 8, '\u5173\u6CE8\u533B\u7597\u536B\u751F\u4E8B\u4E1A\u53D1\u5C55\uFF0C\u52A9\u529B\u5065\u5EB7\u4E0A\u57CE\u5EFA\u8BBE\u3002'],
  [14, '\u793E\u4F1A\u798F\u5229\u548C\u4FDD\u969C\u754C\u522B', 6, '\u5173\u6CE8\u6C11\u751F\u798F\u7949\uFF0C\u63A8\u52A8\u793E\u4F1A\u4FDD\u969C\u4F53\u7CFB\u5EFA\u8BBE\u3002'],
  [15, '\u6C11\u5B97\u754C\u522B', 4, '\u4FC3\u8FDB\u6C11\u65CF\u56E2\u7ED3\u3001\u5B97\u6559\u548C\u7766\uFF0C\u94F8\u7262\u4E2D\u534E\u6C11\u65CF\u5171\u540C\u4F53\u610F\u8BC6\u3002'],
  [16, '\u7279\u9080\u754C\u522B', 12, '\u6C47\u805A\u5404\u754C\u7CBE\u82F1\u529B\u91CF\uFF0C\u53D1\u6325\u7279\u9080\u4EBA\u58EB\u4E13\u4E1A\u4F18\u52BF\u3002'],
];
jbInfo.forEach((j, i) => {
  out += `  { id: ${j[0]}, name: "${j[1]}", members: ${j[2]}, desc: "${j[3]}" }${i < jbInfo.length - 1 ? ',' : ''}\n`;
});
out += '];\n\n';

out += 'export const centerData = {\n';
out += '  overview: "\\u4E0A\\u57CE\\u533A\\u653F\\u534F\\u575A\\u6301\\u4EE5\\u4E60\\u8FD1\\u5E73\\u65B0\\u65F6\\u4EE3\\u4E2D\\u56FD\\u7279\\u8272\\u793E\\u4F1A\\u4E3B\\u4E49\\u601D\\u60F3\\u4E3A\\u6307\\u5BFC\\uFF0C\\u6DF1\\u5165\\u5B66\\u4E60\\u8D2F\\u5F7B\\u515A\\u7684\\u4E8C\\u5341\\u5927\\u548C\\u4E8C\\u5341\\u5C4A\\u5386\\u6B21\\u5168\\u4F1A\\u7CBE\\u795E\\uFF0C\\u951A\\u5B9A\\u65B0\\u65F6\\u4EE3\\u4EBA\\u6C11\\u653F\\u534F\\u65B0\\u65B0\\u65B9\\u4F4D\\u65B0\\u4F7F\\u547D\\u3002",\n';
out += '  centers: [\n';
out += '    {\n';
out += '      name: "\\u4E0A\\u57CE\\u533A\\uFF08\\u5F6D\\u57E0\\uFF09\\u65B0\\u65F6\\u4EE3\\u534F\\u5546\\u6C11\\u4E3B\\u5B9E\\u8DF5\\u4E2D\\u5FC3",\n';
out += '      established: "2023\\u5E743\\u6708",\n';
out += '      address: "\\u5F6D\\u57E0\\u8857\\u9053\\u7F57\\u5BB6\\u8001\\u5B85",\n';
out += '      desc: "\\u4E2D\\u5FC3\\u6309\\u7167\\u4E00\\u56ED\\u4E00\\u5802\\u4E00\\u9986\\u4E24\\u7AD9\\u5E03\\u5C40\\uFF0C\\u96C6\\u6210\\u679C\\u5C55\\u793A\\u3001\\u653F\\u7B56\\u5BA3\\u4F20\\u3001\\u7406\\u8BBA\\u5BA3\\u8BB2\\u3001\\u6C11\\u4E3B\\u8BAE\\u4E8B\\u3001\\u8BFB\\u4E66\\u4EA4\\u6D41\\u3001\\u534F\\u5546\\u8BAE\\u653F\\u7B49\\u529F\\u80FD\\u4E8E\\u4E00\\u4F53\\u3002",\n';
out += '      images: ' + JSON.stringify(pbImages) + ',\n';
out += '    },\n';
out += '    {\n';
out += '      name: "\\u4E0A\\u57CE\\u533A\\uFF08\\u7D2B\\u9633\\uFF09\\u65B0\\u65F6\\u4EE3\\u534F\\u5546\\u6C11\\u4E3B\\u5B9E\\u8DF5\\u4E2D\\u5FC3",\n';
out += '      established: "2025\\u5E74\\u5E95",\n';
out += '      address: "\\u7D2B\\u9633\\u897F\\u6CF7\\u4E66\\u623F",\n';
out += '      desc: "\\u4E2D\\u5FC3\\u6309\\u7167\\u4E00\\u5BB6\\u4E03\\u666F\\u529F\\u80FD\\u5E03\\u5C40\\uFF0C\\u5F62\\u6210\\u591A\\u5143\\u534F\\u540C\\u3001\\u95ED\\u73AF\\u843D\\u5B9E\\u3001\\u6548\\u80FD\\u63D0\\u5347\\u4E09\\u5927\\u5DE5\\u4F5C\\u673A\\u5236\\u3002",\n';
out += '      images: ' + JSON.stringify(zyImages) + ',\n';
out += '    },\n';
out += '  ],\n';
out += '};\n\n';

out += 'export const streetData = [\n';
out += '  "\\u6E56\\u6EE8\\u8857\\u9053", "\\u6E05\\u6CE2\\u8857\\u9053", "\\u5C0F\\u8425\\u8857\\u9053", "\\u671B\\u6C5F\\u8857\\u9053",\n';
out += '  "\\u5357\\u661F\\u8857\\u9053", "\\u7D2B\\u9633\\u8857\\u9053", "\\u95F8\\u5F04\\u53E3\\u8857\\u9053", "\\u51EF\\u65CB\\u8857\\u9053",\n';
out += '  "\\u91C7\\u8377\\u8857\\u9053", "\\u56DB\\u5B63\\u9752\\u8857\\u9053", "\\u7B1B\\u6865\\u8857\\u9053", "\\u5F6D\\u57E0\\u8857\\u9053",\n';
out += '  "\\u4E5D\\u5821\\u8857\\u9053", "\\u4E01\\u5170\\u8857\\u9053",\n';
out += '];\n';

fs.writeFileSync(path.join(outBase, 'studios.js'), out, 'utf-8');

// jiebierPhotos.js
const jbOut = 'export const jiebierPhotos = ' + JSON.stringify(jiebierPhotoMap, null, 2) + ';\n';
fs.writeFileSync(path.join(outBase, 'jiebierPhotos.js'), jbOut, 'utf-8');

console.log('Data files generated successfully');
