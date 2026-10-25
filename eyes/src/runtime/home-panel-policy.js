/** Keep the original panel populated and enabled so its expand controls still work. */
export function installHomePanelPolicy(HomeView) {
  const updateComponents = HomeView.prototype._updateComponents;
  HomeView.prototype._updateComponents = async function updateHomeComponents(...args) {
    const result = await updateComponents.apply(this, args);
    this._app.getComponent('featuredStoriesPanel')?.hide();
    return result;
  };
}
