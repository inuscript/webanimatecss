// https://developer.mozilla.org/en-US/docs/Web/API/AnimationEffectTimingProperties

const count = (num) => {
  if (num === Infinity) {
    return 'infinite'
  }
  return num.toString()
}

const ms = (num) => {
  if (!isNaN(num)) {
    return num + 'ms'
  }
  return num
}

const getEasing = (keyframeInput, options) => {
  // CSS default = ease
  // Element.animate default = linear
  if (Array.isArray(keyframeInput)) {
    // TODO: Fix output redundant linear setting
    const keyframes = keyframeInput
    // let current = 'linear'
    let easings = keyframes.map((k) => {
      return k.easing || 'linear'
    })
    return easings.filter(k => !!k).join(',')
  }

  if (!Array.isArray(keyframeInput) && keyframeInput.easing) {
    return keyframeInput.easing
  }
  return 'linear'
}

const finalizeOptions = (props) => {
  const {easing, direction, duration, delay, iterations, fill} = props
  let converted = {}
  if (easing) {
    converted['animationTimingFunction'] = easing
  }
  if (direction) {
    converted['animationDirection'] = direction
  }
  if (duration) {
    converted['animationDuration'] = ms(duration)
  }
  if (delay) {
    converted['animationDelay'] = ms(delay)
  }
  if (iterations) {
    converted['animationIterationCount'] = count(iterations)
  }
  if (fill) {
    converted['animationFillMode'] = fill
  }
  return converted
}

const processOption = (option) => {
  if (typeof option === 'number') {
    return {
      duration: option
    }
  }
  return option
}

const processEasing = (keyframeInput, options) => {
  return {
    easing: getEasing(keyframeInput, options)
  }
}

const defaultValue = {
  // easing: 'linear'
}

module.exports = (keyframeInput, options) => {
  const easing = processEasing(keyframeInput, options)
  const props = processOption(options)
  const merged = Object.assign({}, defaultValue, easing, props)
  const animationOption = finalizeOptions(merged)
  return animationOption
}
