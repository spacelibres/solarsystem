// 对象枚举薄封装，直接保留 Object.entries/keys/values 的键顺序、可枚举性及异常语义，不额外过滤原型或复制值。
// Recovered from app.js:34109-34338.
class ObjectUtils {
  static entries(object) {
    return Object.entries(object);
  }
  static keys(object) {
    return Object.keys(object);
  }
  static values(object) {
    return Object.values(object);
  }
}
export { ObjectUtils };
