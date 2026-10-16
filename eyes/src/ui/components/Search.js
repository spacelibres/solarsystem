// Recovered from app.js:575629-587527.
import * as EyesPublicApi from "../../framework/eyes/public-api.js";
import SearchTemplate from "../templates/SearchTemplate.html";
let defaultExport;
var getSearchTemplate = () => SearchTemplate;
/* 输入防抖后由 search 管理器返回匹配，低分结果和建议分开渲染；结果数组同时保存链接与 DOM，供键盘与悬停共享选择索引。单结果详情失败为 404 时回退列表，相关故事/事件等块继续加入同一导航序列。 */
class Search extends EyesPublicApi.BaseComponent {
  constructor(app, options = {
    config: {}
  }) {
    options.config = {
      initialOpen: false,
      allowFeatured: false,
      allowDetail: true,
      allowInfo: false,
      stopOnExactMatch: false,
      infoText: {
        default: "most popular",
        results: "result",
        suggestions: "suggestion",
        nomatches: "no matches"
      },
      maxSuggestions: 1,
      placeholderText: "Search...",
      nameSearch: ["iauName", "displayName"],
      nameDisplay: ["displayName", "iauName"],
      ...options.config
    };
    super(app, null, {
      text: "",
      searchInfo: options.config?.infoText?.default || "",
      alwaysOpen: false,
      magClass: "mag-open",
      searchClass: "search-close",
      focusedClass: "",
      isFeaturedVisible: false,
      ...options
    });
    this._class.isItemVisible = {
      true: "",
      false: "hidden"
    };
    Object.assign(this._state, {
      allowFeaturedClass: this._class.isItemVisible[this._config.allowFeatured],
      isFeaturedVisibleClass: this._class.isItemVisible[this._config.allowFeatured && this._state.isFeaturedVisible],
      allowInfoClass: this._class.isItemVisible[this._config.allowInfo]
    });
    this._eventNames.push("resultselected");
    this._initCallbacks();
    this._resultsScrollbar = null;
    this._featuredScrollbar = null;
    this.onResize = null;
    this.results = [];
    this._excludeResults = [];
    this._suggestionsThreshold = .05;
    this.index = -1;
    this.bindFunctions(["_find", "renderResults", "open", "close", "eraseInput", "onIconClick", "reset", "keydown", "onInputFocus", "_getDetails", "_handleClick"]);
    window.addEventListener("setupSearch", this.resize);
  }
  init() {
    super.init();
    const placeholderWidth = .9 * this._children.input.getAttribute("placeholder").length;
    this._children.input.style.minWidth = `${placeholderWidth}ch`;
    this._children.input.onkeyup = keyEvent => {
      const isInputEmpty = 0 === this._children.input.value.length;
      this._config.allowFeatured && isInputEmpty !== this._state.isFeaturedVisible && (this._featuredScrollbar?.scroll(0), this.setState({
        isFeaturedVisible: isInputEmpty,
        isFeaturedVisibleClass: this._class.isItemVisible[isInputEmpty],
        ...(isInputEmpty && {
          searchInfo: this._config.infoText.default
        })
      }));
    };
    this.resize();
    this.registerManager(this._app.getManager("search"));
  }
  onIconClick() {
    "search-close" === this._state.searchClass ? (this._scrollbar?.scroll(0), this.open(), this._children.input.focus()) : "" === this._children.input.value ? this.reset() : this._children.results.querySelector(".active")?.firstChild.click();
  }
  resize() {
    super.resize();
    "function" == typeof this.onResize && this.onResize();
  }
  reset() {
    this.eraseInput();
    this._config.initialOpen || this.close();
  }
  keydown(keyEvent) {
    const keyName = keyEvent.key;
    "Escape" === keyName && (this.eraseInput(), this.close());
    const resultCount = this.results.length;
    resultCount && ("ArrowDown" === keyName ? (this.index = (this.index + 1) % resultCount, keyEvent.preventDefault()) : "ArrowUp" === keyName ? (this.index -= 1, this.index < 0 && (this.index = resultCount - 1), keyEvent.preventDefault()) : "Enter" === keyName && (this._handleClick(this.results[this.index]?.link || this.results[0]?.link, this._searchString), keyEvent.preventDefault()), this.setSelected(this.index));
  }
  setSelected(index) {
    this.index = index;
    for (let resultIndex = 0; resultIndex < this.results.length; resultIndex++) {
      const resultElement = this.results[resultIndex].element;
      resultElement && (resultIndex === this.index ? resultElement.classList.add("active") : resultElement.classList.remove("active"));
    }
  }
  onInputFocus() {
    this.setState({
      focusedClass: "input-focused"
    });
  }
  eraseInput() {
    this._resultsScrollbar?.destroy();
    this._resultsScrollbar = null;
    this._children.input.value = "";
    this._children.results.innerHTML = "";
  }
  registerManager(searchManager) {
    this._searchManager = searchManager;
  }
  _find(inputEvent, searchText) {
    this._searchTimeout && clearTimeout(this._searchTimeout);
    inputEvent && inputEvent.target && inputEvent.target.value && (searchText = inputEvent.target.value);
    const {
      maxEntries: maxEntries
    } = this._config;
    this._searchTimeout = setTimeout(async () => {
      if (this._searchManager) {
        const matches = this._searchManager.find(searchText, maxEntries);
        const includedMatches = matches?.length && this._excludeResults?.length ? matches.filter(({
          item: item
        }) => !this._excludeResults.includes(item.id)) : matches;
        await this.renderResults(includedMatches, searchText);
      }
    }, 100);
  }
  async renderResults(matches, searchString) {
    if (this.index = -1, this.results = [], this._searchString = searchString, this._resultsScrollbar?.destroy(), this._resultsScrollbar = null, this._children.results.innerHTML = "", this._children.results.classList.remove("no-results"), !matches || !Array.isArray(matches)) return;
    const suggestions = [];
    const exactResults = [];
    for (let matchIndex = 0; matchIndex < matches.length; matchIndex++) {
      const match = matches[matchIndex];
      const {
        nameSearch: nameSearch
      } = this._config;
      const searchableName = match.item[nameSearch.find(fieldName => void 0 !== match.item[fieldName])];
      if (this._config.stopOnExactMatch && searchString.toLowerCase() === searchableName.toLowerCase()) {
        exactResults.length = 0;
        suggestions.length = 0;
        exactResults.push(match);
        break;
      }
      match.score < this._suggestionsThreshold ? exactResults.push(match) : suggestions.push(match);
    }
    1 === exactResults.length ? this._config.allowDetail ? await this._renderResultCard(exactResults[0], searchString) : this._renderResultList(exactResults, searchString) : 0 === exactResults.length ? this._renderSuggestions(suggestions, searchString) : this._renderResultList(exactResults, searchString);
    exactResults.length > 3 && (this._resultsScrollbar ??= this._createScrollbar(this._children.results));
    const {
      allowInfo: allowInfo,
      infoText: infoText,
      maxSuggestions: maxSuggestions
    } = this._config;
    if (allowInfo) {
      let infoMessage = infoText.nomatches;
      exactResults.length ? infoMessage = `${exactResults.length} ${infoText.results}${exactResults.length > 1 ? "s" : ""}` : suggestions.length && (infoMessage = `${Math.min(suggestions.length, maxSuggestions)} ${infoText.suggestions}${suggestions.length > 1 ? "s" : ""}`);
      this.setState({
        searchInfo: infoMessage
      });
    }
    this.setSelected(0);
  }
  async _renderResultCard(match, searchText) {
    try {
      let entityDetails = await this._getDetails(match);
      if (!entityDetails && match && match.item) {
        const {
          nameDisplay: nameDisplay
        } = this._config;
        entityDetails = {
          title: match.item[nameDisplay.find(fieldName => void 0 !== match.item[fieldName])]
        };
      }
      const cardElement = document.createElement("div");
      cardElement.className = "card-title result-div";
      const titleElement = document.createElement("h4");
      titleElement.className = "semi clickable";
      let highlightedTitle = entityDetails.title;
      if ("string" == typeof highlightedTitle) {
        const matchStart = highlightedTitle.toUpperCase().indexOf(searchText.toUpperCase());
        if (matchStart > -1) {
          const matchedText = highlightedTitle.substring(matchStart, matchStart + searchText.length);
          const unmatchedParts = highlightedTitle.split(matchedText);
          unmatchedParts && 2 === unmatchedParts.length && (highlightedTitle = "", unmatchedParts[0].length > 0 && (highlightedTitle += `<span class='unmatch'>${unmatchedParts[0]}</span>`), highlightedTitle += matchedText, unmatchedParts[1].length > 0 && (highlightedTitle += `<span class='unmatch'>${unmatchedParts[1]}</span>`));
        }
      } else highlightedTitle = "";
      titleElement.innerHTML = highlightedTitle;
      const resultLink = EyesPublicApi.AppUtils.addStartToPath(match.item.id);
      titleElement.addEventListener("mouseover", () => {
        this.setSelected(0);
      }, false);
      titleElement.addEventListener("click", clickEvent => {
        match.item && this._handleClick(match.item.id, searchText);
        clickEvent?.stopPropagation?.();
      }, false);
      cardElement.appendChild(titleElement);
      this.results.push({
        link: resultLink,
        element: cardElement
      });
      this._children.results.innerHTML = "";
      this._children.results.appendChild(cardElement);
      entityDetails.cards && this._createStoryBlock(entityDetails.cards);
      entityDetails.featuredEvents && entityDetails.featuredEvents.initial && this._createEventsBlock(entityDetails.featuredEvents.initial, match.item.id);
      entityDetails.exploration && entityDetails.exploration.initial && this._createExplorationBlock(entityDetails.exploration.initial);
      entityDetails.featuredMoons && this._createMoonsBlock(entityDetails.featuredMoons, match.item.id);
    } catch (detailsError) {
      void 0 !== detailsError.status && 404 === detailsError.status ? this._renderResultList([match], searchText) : detailsError && console.error(detailsError);
    }
  }
  _createEventsBlock(featuredEvents, entityId) {
    if (!Array.isArray(featuredEvents) || 0 === featuredEvents.length) return;
    const entityInfo = this._app.getManager("content").getEntityInfo(entityId);
    if (null === entityInfo || !entityInfo.hasEvents) return;
    const blockElement = this._createBlockContainer();
    blockElement.classList.add("events");
    this._createHeaderBlock("Featured Events", blockElement);
    for (let eventIndex = 0; eventIndex < featuredEvents.length; eventIndex++) {
      const eventInfo = featuredEvents[eventIndex];
      const eventTitle = eventInfo.title;
      const eventLink = EyesPublicApi.AppUtils.addStartToPath(entityId + "/events/" + eventInfo.eventId);
      const resultElement = this._createSingleResult(eventTitle, eventLink, blockElement);
      this.results.push({
        link: eventLink,
        element: resultElement
      });
    }
  }
  _createMoonsBlock(moonEntries) {
    if (!Array.isArray(moonEntries) || 0 === moonEntries.length) return;
    const blockElement = this._createBlockContainer();
    blockElement.classList.add("moons");
    this._createHeaderBlock("Featured Moons", blockElement);
    for (let moonIndex = 0; moonIndex < moonEntries.length; moonIndex++) {
      const moonTitle = moonEntries[moonIndex];
      const moonLink = moonEntries[moonIndex];
      const resultElement = this._createSingleResult(moonTitle, moonLink, blockElement);
      this.results.push({
        link: moonLink,
        element: resultElement
      });
    }
  }
  _createExplorationBlock(explorationLinks) {
    if (!Array.isArray(explorationLinks) || 0 === explorationLinks.length) return;
    const blockElement = this._createBlockContainer();
    blockElement.classList.add("exploration");
    this._createHeaderBlock("Exploration", blockElement);
    for (let entryIndex = 0; entryIndex < explorationLinks.length; entryIndex++) {
      const explorationInfo = explorationLinks[entryIndex];
      let entryTitle = explorationInfo.title;
      null !== explorationInfo.info && void 0 !== explorationInfo.info && (entryTitle += " (" + explorationInfo.info + ")");
      const entryLink = explorationInfo.url;
      const resultElement = this._createSingleResult(entryTitle, entryLink, blockElement);
      this.results.push({
        link: entryLink,
        element: resultElement
      });
    }
  }
  _createStoryBlock(storyCards) {
    if (!Array.isArray(storyCards) || 0 === storyCards.length) return;
    const blockElement = this._createBlockContainer();
    blockElement.classList.add("stories");
    let headerCreated = false;
    for (let cardIndex = 0; cardIndex < storyCards.length; cardIndex++) {
      const storyCard = storyCards[cardIndex];
      if (void 0 !== storyCard.storyId) {
        const storyInfo = this._app.getManager("content").getStoryList().stories[storyCard.storyId];
        if (void 0 !== storyInfo) {
          headerCreated || (this._createHeaderBlock("Stories", blockElement), headerCreated = true);
          const storyTitle = storyInfo.title;
          const storyLink = "/story/" + storyCard.storyId;
          const resultElement = this._createSingleResult(storyTitle, storyLink, blockElement);
          this.results.push({
            link: storyLink,
            element: resultElement
          });
        }
      }
    }
  }
  _createBlockContainer() {
    const blockElement = document.createElement("div");
    blockElement.className = "block-container";
    this._children.results.appendChild(blockElement);
    return blockElement;
  }
  _createHeaderBlock(headerText, blockElement) {
    const headerElement = document.createElement("div");
    headerElement.className = "header";
    const titleElement = document.createElement("span");
    titleElement.className = "title small semi";
    titleElement.innerHTML = headerText;
    headerElement.appendChild(titleElement);
    blockElement.appendChild(headerElement);
  }
  _createSingleResult(resultTitle, resultLink, parentElement) {
    const resultElement = document.createElement("div");
    resultElement.className = "result-div";
    const resultButton = document.createElement("button");
    resultButton.className = "small clickable capitalize";
    resultButton.innerHTML = resultTitle;
    const resultIndex = this.results.length - 1 + 1;
    resultElement.addEventListener("click", clickEvent => {
      this._handleClick(resultLink, this._searchString);
      clickEvent?.stopPropagation?.();
    }, false);
    resultElement.addEventListener("mouseover", () => {
      this.setSelected(resultIndex);
    }, false);
    resultElement.appendChild(resultButton);
    parentElement.appendChild(resultElement);
    return resultElement;
  }
  _renderResultList(matches, searchText) {
    for (let resultIndex = 0; resultIndex < matches.length; resultIndex++) {
      const entityInfo = matches[resultIndex].item;
      const {
        nameSearch: nameSearch
      } = this._config;
      const searchableName = entityInfo[nameSearch.find(fieldName => void 0 !== entityInfo[fieldName])];
      if (!searchableName) continue;
      const resultButton = document.createElement("button");
      resultButton.className = "entries clickable thin small";
      const rawLink = entityInfo.url || entityInfo.id;
      let highlightedName = searchableName;
      const matchStart = searchableName.toUpperCase().indexOf(searchText.toUpperCase());
      if (matchStart > -1) {
        const matchedText = highlightedName.substring(matchStart, matchStart + searchText.length);
        highlightedName = highlightedName.replace(matchedText, `<span class='semi'>${matchedText}</span>`);
      }
      resultButton.innerHTML = highlightedName;
      const resultLink = EyesPublicApi.AppUtils.addStartToPath(rawLink);
      const resultElement = document.createElement("div");
      resultElement.className = "result-div";
      resultElement.appendChild(resultButton);
      resultElement.addEventListener("mouseover", () => {
        this.setSelected(resultIndex);
      }, false);
      resultElement.addEventListener("click", clickEvent => {
        this._handleClick(rawLink, searchText);
        clickEvent?.stopPropagation?.();
      }, false);
      this.results.push({
        link: resultLink,
        element: resultElement
      });
      this._children.results.appendChild(resultElement);
    }
  }
  _renderSuggestions(suggestions, searchText) {
    const suggestionsElement = document.createElement("div");
    if (suggestionsElement.className = "suggestion", suggestions.length > 0) {
      const headingElement = document.createElement("label");
      headingElement.className = "title small semi";
      headingElement.innerHTML = "Did you mean...?";
      suggestionsElement.appendChild(headingElement);
      for (let suggestionIndex = 0; suggestionIndex < Math.min(this._config.maxSuggestions, suggestions.length); suggestionIndex++) {
        const resultButton = document.createElement("button");
        resultButton.className = "entries clickable";
        const entityInfo = suggestions[suggestionIndex].item;
        const {
          nameSearch: nameSearch
        } = this._config;
        const searchableName = entityInfo[nameSearch.find(fieldName => void 0 !== entityInfo[fieldName])];
        if (searchableName) {
          const rawLink = entityInfo.url || entityInfo.id;
          resultButton.innerHTML = searchableName;
          const resultLink = EyesPublicApi.AppUtils.addStartToPath(rawLink);
          resultButton.addEventListener("mouseover", () => {
            this.setSelected(suggestionIndex);
          }, false);
          resultButton.addEventListener("click", clickEvent => {
            this._handleClick(rawLink, searchText);
            clickEvent?.stopPropagation?.();
          }, false);
          const resultElement = document.createElement("div");
          resultElement.className = "result-div small";
          resultElement.appendChild(resultButton);
          suggestionsElement.appendChild(resultElement);
          this.results.push({
            link: resultLink,
            element: resultElement
          });
        }
      }
    } else if (!this._config.allowInfo) {
      const noMatchesLabel = document.createElement("label");
      noMatchesLabel.className = "title no-match small";
      noMatchesLabel.innerHTML = "No matches.";
      suggestionsElement.appendChild(noMatchesLabel);
      this._children.results.classList.add("no-results");
    }
    this._children.results.appendChild(suggestionsElement);
  }
  open() {
    this.setState({
      magClass: "mag-close",
      searchClass: "search-open",
      isFeaturedVisible: this._config.allowFeatured,
      isFeaturedVisibleClass: this._class.isItemVisible[this._config.allowFeatured],
      ...(this._config.allowFeatured && {
        searchInfo: this._config.infoText.default
      })
    });
    this.app.isSearching = true;
  }
  close() {
    this.getState("alwaysOpen") ? this.setState({
      magClass: "mag-close",
      searchClass: "search-open",
      focusedClass: "",
      isFeaturedVisible: false,
      isFeaturedVisibleClass: this._class.isItemVisible.false
    }) : this.setState({
      magClass: "mag-open",
      searchClass: "search-close",
      focusedClass: "",
      isFeaturedVisible: false,
      isFeaturedVisibleClass: this._class.isItemVisible.false
    });
    this._children.input?.blur();
    this.app.isSearching = false;
  }
  setupFeaturedSuggestion(suggestions = []) {
    this._children.featured.innerHTML = "";
    for (let suggestionIndex = 0; suggestionIndex < suggestions.length; suggestionIndex++) {
      const {
        text: text,
        url: url
      } = suggestions[suggestionIndex];
      const listItem = document.createElement("li");
      listItem.innerHTML = text;
      listItem.className = "clickable thin";
      listItem.addEventListener("click", clickEvent => {
        this._handleClick(url, this._searchString);
        clickEvent?.stopPropagation?.();
      });
      this._children.featured.appendChild(listItem);
    }
  }
  _createScrollbar(scrollElement) {
    return EyesPublicApi.AppUtils.addScrollbar(scrollElement, {
      sizeAutoCapable: true
    });
  }
  _getLink(link) {
    return link;
  }
  _handleClick(selectedLink, searchText) {
    if (!selectedLink) return;
    this.reset();
    this.triggerCallbacks("resultselected");
    const routerManager = this._app.getManager("router");
    const resolvedLink = this._getLink(selectedLink);
    const routePath = "string" == typeof resolvedLink ? resolvedLink : resolvedLink.path ?? "";
    if (routePath.includes("events")) routerManager.navigate({}, routePath, {
      __remove: "all"
    });else {
      const {
        options: navigationOptions = {
          keepTime: true
        },
        query: queryParams = {}
      } = "object" == typeof resolvedLink && resolvedLink;
      routerManager.navigate(queryParams, routePath, navigationOptions);
    }
  }
  simulate(searchText) {
    const {
      input: input
    } = this._children;
    this.onIconClick();
    input.value = searchText;
    this._find({}, searchText);
    input.onkeyup();
  }
  async _getDetails(match) {
    return this._app.getManager("content").getEntityDesc(match.item.id);
  }
  setExcludeResults(excludeResults) {
    this._excludeResults = excludeResults;
  }
  __enable() {
    super.__enable();
    const {
      allowFeatured: allowFeatured
    } = this._config;
    if (allowFeatured) {
      const {
        parentElement: parentElement
      } = this._children.featured || {};
      document.body.contains(parentElement) && (this._featuredScrollbar ??= this._createScrollbar(parentElement));
    }
  }
}
Search.html = getSearchTemplate();
defaultExport = Search;
export { defaultExport as default };
