/** 按索引顺序调用工厂构造固定长度数组，每个槽都单独调用，绝不复用同一个返回对象。 */
// Recovered from app.js:43268-43613.
class Tuple {
  static create2Tuple(factory) {
    return [factory(0), factory(1)];
  }
  static create3Tuple(factory) {
    return [factory(0), factory(1), factory(2)];
  }
  static create4Tuple(factory) {
    return [factory(0), factory(1), factory(2), factory(3)];
  }
  static create5Tuple(factory) {
    return [factory(0), factory(1), factory(2), factory(3), factory(4)];
  }
  static create6Tuple(factory) {
    return [factory(0), factory(1), factory(2), factory(3), factory(4), factory(5)];
  }
}
export { Tuple };
