/** 二分返回第一个不小于项；add 将重复项放在已有等值项后，remove 只移除一个。插入排序交换后立即通知 onSwap。 */
// Recovered from app.js:39659-40702.
class Sort {
  static getIndex(value, values) {
    let lowerIndex = 0;
    let upperIndex = values.length;
    for (; lowerIndex < upperIndex;) {
      const middleIndex = lowerIndex + upperIndex >>> 1;
      if (values[middleIndex] < value) {
        lowerIndex = middleIndex + 1;
      } else {
        upperIndex = middleIndex;
      }
    }
    return lowerIndex;
  }
  static getIndexObject(value, values, isLess) {
    let lowerIndex = 0;
    let upperIndex = values.length;
    for (; lowerIndex < upperIndex;) {
      const middleIndex = lowerIndex + upperIndex >>> 1;
      if (isLess(values[middleIndex], value)) {
        lowerIndex = middleIndex + 1;
      } else {
        upperIndex = middleIndex;
      }
    }
    return lowerIndex;
  }
  static add(value, values) {
    let insertionIndex = this.getIndex(value, values);
    for (; insertionIndex < values.length && values[insertionIndex] === value;) insertionIndex += 1;
    values.splice(insertionIndex, 0, value);
  }
  static addObject(value, values, isLess, isEqual) {
    let insertionIndex = this.getIndexObject(value, values, isLess);
    for (; insertionIndex < values.length && isEqual(values[insertionIndex], value);) insertionIndex += 1;
    values.splice(insertionIndex, 0, value);
  }
  static remove(value, values) {
    const index = this.getIndex(value, values);
    let found = false;
    if (index < values.length && values[index] === value) {
      found = true;
    }
    if (found) {
      values.splice(index, 1);
    }
    return found;
  }
  static removeObject(value, values, isLess, isEqual) {
    const index = this.getIndexObject(value, values, isLess);
    let found = false;
    if (index < values.length && isEqual(values[index], value)) {
      found = true;
    }
    if (found) {
      values.splice(index, 1);
    }
    return found;
  }
  static sort(values, onSwap) {
    if (0 === values.length) return;
    let insertionIndex = 1;
    for (; insertionIndex < values.length;) {
      let comparisonIndex = insertionIndex - 1;
      for (; comparisonIndex >= 0 && values[comparisonIndex + 1] < values[comparisonIndex];) {
        const swappedValue = values[comparisonIndex];
        values[comparisonIndex] = values[comparisonIndex + 1];
        values[comparisonIndex + 1] = swappedValue;
        if (onSwap) {
          onSwap(comparisonIndex + 1, comparisonIndex);
        }
        comparisonIndex--;
      }
      insertionIndex++;
    }
  }
  static sortObject(values, isLess, onSwap) {
    if (0 === values.length) return;
    let insertionIndex = 1;
    for (; insertionIndex < values.length;) {
      let comparisonIndex = insertionIndex - 1;
      for (; comparisonIndex >= 0 && isLess(values[comparisonIndex + 1], values[comparisonIndex]);) {
        const swappedValue = values[comparisonIndex];
        values[comparisonIndex] = values[comparisonIndex + 1];
        values[comparisonIndex + 1] = swappedValue;
        if (onSwap) {
          onSwap(comparisonIndex + 1, comparisonIndex);
        }
        comparisonIndex--;
      }
      insertionIndex++;
    }
  }
}
export { Sort };
