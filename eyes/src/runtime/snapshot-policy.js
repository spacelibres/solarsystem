/** Pin only Earth image selection; simulation time and other body layers stay independent. */
export function installEarthSnapshot({ manager, component, layers }, snapshot) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(snapshot.date) || new Date(snapshot.date).toISOString().slice(0, 10) !== snapshot.date) throw new Error('Invalid Earth snapshot date');
  const originalDate = manager.prototype.getImageDate;
  manager.prototype.getImageDate = function getImageDate(requestedTime) {
    return requestedTime === 'now' || requestedTime === 'yesterday' ? snapshot.date : originalDate.call(this, requestedTime);
  };
  const originalDimension = component.prototype.setDimensionValue;
  component.prototype.setDimensionValue = function setDimensionValue(name, value) {
    return originalDimension.call(this, name, name === 'Time' && this.getEntity().getName() === 'earth' ? snapshot.date : value);
  };
  layers.earth[0].title = `Global mosaic snapshot: ${snapshot.date}`;
}
