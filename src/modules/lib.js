/**
 * This function recursively find a parent node of `node` which has class name as parentClassName.
 *
 * @param {object} node
 * @param {string} parentClassName
 * @param {string} upperBoundClassName This is the class name of the top most node in the dom tree after which you don't want to search
 * @returns object
 */
function getParentNodeWithClass (node, parentClassName, upperBoundClassName) {
  if(node) {
    upperBoundClassName = upperBoundClassName || 'page-body'
    if(node.className === upperBoundClassName) {
      return null
    }
    return (node.className && node.className.indexOf(parentClassName) > -1) ? node : getParentNodeWithClass(node.parentNode, parentClassName, upperBoundClassName)
  }
  return null;
}

export {getParentNodeWithClass}
