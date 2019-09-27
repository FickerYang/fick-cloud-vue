/*
 * 菜单国际化
 * @Author: Fick 
 * @Date: 2019-07-01 18:47:18 
 * @Last Modified by: Fick
 * @Last Modified time: 2019-07-01 19:10:09
 */

export function generateTitle(_this,title) {
  const translatedTitle = _this.$t('route.' + title)
  const hasKey = _this.$te('route.' + title)

  if (hasKey) {
    return translatedTitle
  }
  return title
}
