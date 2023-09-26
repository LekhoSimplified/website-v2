function dom2Vnode(element) {
  if (!element) return null;

  const jsonNode = {
    tag: element.tagName,
    attributes: {},
    children: [],
  };

    for (const attr of ['id', 'class', 'src', 'datetime', 'href', 'type', 'value', 'onclick']) {
        if (element.hasAttribute(attr)) {
            jsonNode.attributes[attr] = element.getAttribute(attr)
        }
    }

    for (const data_attr in element.dataset) {
        jsonNode.attributes['data-'+data_attr] = element.dataset[data_attr]
    }

  // Recursively process child nodes
  for (const childNode of element.childNodes) {
      if (childNode.nodeType === Node.TEXT_NODE) {
          jsonNode.children.push(childNode.nodeValue);
      }
      else if (childNode.nodeType === Node.ELEMENT_NODE) {
          jsonNode.children.push(dom2Vnode(childNode));
      }
  }

  return m(jsonNode.tag,jsonNode.attributes,jsonNode.children);
}

function dom2Mithril(element, level) {
  if (!element) return null;

  if (!level) {
    level = 0;
  }

  const jsonNode = {
    tag: element.tagName,
    attributes: {},
    children: [],
  };

    for (const attr of ['id', 'class', 'src', 'datetime', 'href', 'type', 'value', 'onclick']) {
        if (element.hasAttribute(attr)) {
            jsonNode.attributes[attr] = element.getAttribute(attr).replace('\'', '\\x27').replace('\"', '\\x22')
        }
    }

    for (const data_attr in element.dataset) {
        jsonNode.attributes['data-'+data_attr] = element.dataset[data_attr].replace('\'', '\\x27').replace('\"', '\\x22')
    }

  // Recursively process child nodes
  for (const childNode of element.childNodes) {
      if (childNode.nodeType === Node.TEXT_NODE && childNode.nodeValue.trim().length > 0) {
          jsonNode.children.push(`${'\t'.repeat(level+2)}'${childNode.nodeValue.replace('\'', '\\x27').replace('\"', '\\x22')}'`);
      }
      else if (childNode.nodeType === Node.ELEMENT_NODE) {
          jsonNode.children.push(dom2Mithril(childNode, level+1));
      }
  }

  // jsonNode.children = JSON.stringify(jsonNode.children);

  attr = []
  for (a in jsonNode.attributes) {
    attr.push(`\n${'\t'.repeat(level+2)}\"${a}\": '${jsonNode.attributes[a]}'`)
  }

  return `${'\t'.repeat(level)}m('`+jsonNode.tag+`', {`+attr.join(',')+`\n${'\t'.repeat(level+1)}},[\n` + jsonNode.children.join(`,\n`) + `\n${'\t'.repeat(level)}])`;
}