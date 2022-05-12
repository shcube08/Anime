var script = {
  name: "Landing",
  metaInfo: {
    title: "It's Lunch Time!"
  },
  data() {
    return {
      isRunning: false,
      selectedIndex: 0,
      selectedRestaurant: null,
      pastSelections: [],
      slots: [],
      actionText: "I'm Hungry",
      restaurants: [
        {
          id: "1",
          name: "Brickhouse Pizza"
        },
        {
          id: "2",
          name: "Addies Thai House"
        },
        {
          id: "3",
          name: "Las Palmas"
        },
        {
          id: "4",
          name: "Companion Bakery"
        },
        {
          id: "4",
          name: "Wok Express"
        },
        {
          id: "5",
          name: "Qdoba"
        },
        {
          id: "6",
          name: "Dave and Tony's"
        },
        {
          id: "7",
          name: "Hu Hot"
        },
        {
          id: "8",
          name: "Sybergs"
        },
        {
          id: "9",
          name: "Viviano's"
        },
        {
          id: "10",
          name: "Trainwreck"
        },
        {
          id: "11",
          name: "DD Mau"
        },
        {
          id: "12",
          name: "Gobble Stop"
        },
        {
          id: "13",
          name: "First Watch"
        },
        {
          id: "14",
          name: "Pei Wei"
        },
        {
          id: "15",
          name: "Balducci's"
        },
        {
          id: "16",
          name: "Mod Pizza"
        },
        {
          id: "17",
          name: "China One"
        },
        {
          id: "18",
          name: "Casa Juarez"
        },
        {
          id: "19",
          name: "Edge Wild"
        },
        {
          id: "20",
          name: "Rotisserie"
        },
        {
          id: "21",
          name: "O'Fallon Brewery"
        },
        {
          id: "22",
          name: "Bandana's BBQ"
        },
        {
          id: "23",
          name: "Snarf’s"
        },
        {
          id: "24",
          name: "Vivola Express"
        },
        {
          id: "25",
          name: "Sushi Ai"
        },
        {
          id: "26",
          name: "California Pizza Kitchen"
        },
        {
          id: "27",
          name: "Fuzzy's Tacos"
        },
        {
          id: "28",
          name: "Seoul Taco"
        },
        {
          id: "29",
          name: "Gioia's Deli"
        },
        {
          id: "30",
          name: "Waffle House"
        },
        {
          id: "31",
          name: "The Shack"
        },
        {
          id: "32",
          name: "McAlister's"
        },
        {
          id: "33",
          name: "El Maguey"
        },
        {
          id: "34",
          name: "Mr. Piggy’s Smokehouse"
        },
        {
          id: "35",
          name: "Chipotle"
        }
      ]
    };
  },
  methods: {
    runSlots() {
      // clear the selected restaurant
      this.selectedRestaurant = null;
      // get the last item in past selections
      const lastSelected = this.pastSelections[this.pastSelections.length - 1];
      // filter out any items from the restaurant array that are in the past selections array
      let slotsArray = this.restaurants.filter(
        (it) => !this.pastSelections.find((past) => past.id === it.id)
      );
      // get a randowm index from the slots array
      const selectedIndex = Math.floor(Math.random() * slotsArray.length);
      // get a version of the slots array trimmed to the selected restaurant
      const trimmedSlotsArray = slotsArray.slice(0, selectedIndex + 1);
      // build out the scrolling list
      let scrollSlotsArray = [...slotsArray, ...slotsArray];
      // if there is a last selected item, add it to the beginning of the list so the animation doesn't jump
      if (lastSelected) scrollSlotsArray = [lastSelected, ...scrollSlotsArray];
      // set the slots array for the UI
      this.slots = [...scrollSlotsArray, ...trimmedSlotsArray];
      // run the animation
      this.isRunning = true;
      // after the animation is done, set the selected restaurant, push to past selections, reset the slots array, and stop the animation
      setTimeout(() => {
        this.selectedRestaurant = slotsArray[selectedIndex];
        this.pastSelections.push(this.selectedRestaurant);
        this.slots = [this.selectedRestaurant];
        this.actionText = "Nah, Something Else";
        this.isRunning = false;
      }, 5000);
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "container" }, [
    _c("h1", [
      _vm._v("\n    It's lunch time\n    "),
      _vm.selectedRestaurant
        ? _c("span", [
            _vm._v("at " + _vm._s(_vm.selectedRestaurant.name) + "!")
          ])
        : _vm._e()
    ]),
    _vm._v(" "),
    _c("p", [
      _vm._v(
        "\n    Making decisions is hard, like really hard. So, if the team can't decide\n    where to go to lunch then just let the lunch time slot machine do it. It's\n    time for lunch, where are we going?\n  "
      )
    ]),
    _vm._v(" "),
    _c("div", { staticClass: "slot-machine" }, [
      _c(
        "ul",
        { staticClass: "slot-list", class: { running: _vm.isRunning } },
        _vm._l(_vm.slots, function(r, index) {
          return _c("li", { key: r.id + "-" + index }, [
            _c("p", { staticClass: "slot-text" }, [
              _vm._v("\n          " + _vm._s(r.name) + "\n        ")
            ])
          ])
        }),
        0
      ),
      _vm._v(" "),
      !_vm.slots.length
        ? _c(
            "button",
            { staticClass: "slot-text starter", on: { click: _vm.runSlots } },
            [_vm._v("\n      What's for Lunch?\n    ")]
          )
        : _vm._e()
    ]),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass: "trigger",
        attrs: { disabled: _vm.isRunning },
        on: { click: _vm.runSlots }
      },
      [_vm._v("\n    " + _vm._s(_vm.actionText) + "\n  ")]
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-01001157_0", { source: "\n@import url(\"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap\");\n:root {\n  --primary: #5fb3b3;\n  --primary-lightest: #9be2e2;\n  --primary-light: #79c2c4;\n  --primary-dark: #1a8384;\n  --ink: #0f1c23;\n  --ink-light: #343d46;\n  --timing-l: 5s;\n  --timing-s: 0.5s;\n}\nbody {\n  color: var(--ink-light);\n  font-family: \"IBM Plex Sans\", sans-serif;\n}\nh1 {\n  color: var(--ink);\n  font-size: 1.75rem;\n  font-weight: 700;\n}\n.container {\n  box-sizing: content-box;\n  max-width: 75ch;\n  margin-left: auto;\n  margin-right: auto;\n  padding: max(1rem, 4vw);\n}\n.container > * + * {\n  margin-top: var(--spacer, 1.5em);\n}\n.container > p {\n  line-height: 1.6;\n}\n.slot-machine {\n  height: 8rem;\n  overflow: hidden;\n  border: 2px solid var(--primary);\n  position: relative;\n}\n.slot-list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  transition: 0s;\n}\n.slot-text {\n  background: transparent;\n  border: none;\n  display: grid;\n  font-size: clamp(1.75rem, 2.25vw + 1rem, 4rem);\n  font-weight: 700;\n  height: 8rem;\n  margin: 0;\n  place-content: center;\n  padding: 0;\n  text-align: center;\n  width: 100%;\n}\n.running {\n  transform: translateY(calc(-100% + 8rem));\n  transition: var(--timing-l) cubic-bezier(0.19, 0.97, 0.5, 1.005);\n}\n.starter {\n  color: var(--primary-light);\n}\n.trigger {\n  background-color: var(--primary);\n  backface-visibility: hidden;\n  border: none;\n  color: white;\n  display: flex;\n  font-size: 1.25rem;\n  font-weight: 700;\n  justify-content: center;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 1rem;\n  perspective: 10000px;\n  position: relative;\n  transform-style: preserve-3d;\n  transition: transform var(--timing-s);\n  width: 15rem;\n}\n.trigger::before,\n.trigger::after {\n  background-color: var(--primary);\n  backface-visibility: hidden;\n  content: \"\";\n  display: block;\n  height: 1rem;\n  position: absolute;\n  top: 100%;\n  transform: rotateX(-90deg);\n  transform-origin: 50% 0%;\n  width: 100%;\n}\n.trigger::after {\n  background-color: var(--primary-dark);\n  transform: rotateX(-90deg) scaleX(0);\n  transition-delay: var(--timing-s);\n}\n.trigger:hover {\n  background-color: var(--primary-dark);\n}\n.trigger:disabled {\n  background-color: var(--primary-light);\n  transform: rotateX(90deg);\n}\n.trigger:disabled::after {\n  transform: rotateX(-90deg) scaleX(1);\n  transform-origin: 0 0;\n  transition: transform 4s linear var(--timing-s);\n}\n", map: {"version":3,"sources":["/tmp/codepen/vuejs/src/pen.vue"],"names":[],"mappings":";AAsOA,+FAAA;AACA;EACA,kBAAA;EACA,2BAAA;EACA,wBAAA;EACA,uBAAA;EACA,cAAA;EACA,oBAAA;EACA,cAAA;EACA,gBAAA;AACA;AACA;EACA,uBAAA;EACA,wCAAA;AACA;AACA;EACA,iBAAA;EACA,kBAAA;EACA,gBAAA;AACA;AACA;EACA,uBAAA;EACA,eAAA;EACA,iBAAA;EACA,kBAAA;EACA,uBAAA;AACA;AACA;EACA,gCAAA;AACA;AACA;EACA,gBAAA;AACA;AACA;EACA,YAAA;EACA,gBAAA;EACA,gCAAA;EACA,kBAAA;AACA;AACA;EACA,gBAAA;EACA,SAAA;EACA,UAAA;EACA,cAAA;AACA;AACA;EACA,uBAAA;EACA,YAAA;EACA,aAAA;EACA,8CAAA;EACA,gBAAA;EACA,YAAA;EACA,SAAA;EACA,qBAAA;EACA,UAAA;EACA,kBAAA;EACA,WAAA;AACA;AACA;EACA,yCAAA;EACA,gEAAA;AACA;AACA;EACA,2BAAA;AACA;AACA;EACA,gCAAA;EACA,2BAAA;EACA,YAAA;EACA,YAAA;EACA,aAAA;EACA,kBAAA;EACA,gBAAA;EACA,uBAAA;EACA,iBAAA;EACA,kBAAA;EACA,aAAA;EACA,oBAAA;EACA,kBAAA;EACA,4BAAA;EACA,qCAAA;EACA,YAAA;AACA;AACA;;EAEA,gCAAA;EACA,2BAAA;EACA,WAAA;EACA,cAAA;EACA,YAAA;EACA,kBAAA;EACA,SAAA;EACA,0BAAA;EACA,wBAAA;EACA,WAAA;AACA;AACA;EACA,qCAAA;EACA,oCAAA;EACA,iCAAA;AACA;AACA;EACA,qCAAA;AACA;AACA;EACA,sCAAA;EACA,yBAAA;AACA;AACA;EACA,oCAAA;EACA,qBAAA;EACA,+CAAA;AACA","file":"pen.vue","sourcesContent":["<template>\n  <div class=\"container\">\n    <h1>\n      It's lunch time\n      <span v-if=\"selectedRestaurant\">at {{ selectedRestaurant.name }}!</span>\n    </h1>\n\n    <p>\n      Making decisions is hard, like really hard. So, if the team can't decide\n      where to go to lunch then just let the lunch time slot machine do it. It's\n      time for lunch, where are we going?\n    </p>\n\n    <div class=\"slot-machine\">\n      <ul class=\"slot-list\" :class=\"{ running: isRunning }\">\n        <li v-for=\"(r, index) in slots\" :key=\"`${r.id}-${index}`\">\n          <p class=\"slot-text\">\n            {{ r.name }}\n          </p>\n        </li>\n      </ul>\n      <button v-if=\"!slots.length\" class=\"slot-text starter\" @click=\"runSlots\">\n        What's for Lunch?\n      </button>\n    </div>\n\n    <button class=\"trigger\" @click=\"runSlots\" :disabled=\"isRunning\">\n      {{ actionText }}\n    </button>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: \"Landing\",\n  metaInfo: {\n    title: \"It's Lunch Time!\"\n  },\n  data() {\n    return {\n      isRunning: false,\n      selectedIndex: 0,\n      selectedRestaurant: null,\n      pastSelections: [],\n      slots: [],\n      actionText: \"I'm Hungry\",\n      restaurants: [\n        {\n          id: \"1\",\n          name: \"Brickhouse Pizza\"\n        },\n        {\n          id: \"2\",\n          name: \"Addies Thai House\"\n        },\n        {\n          id: \"3\",\n          name: \"Las Palmas\"\n        },\n        {\n          id: \"4\",\n          name: \"Companion Bakery\"\n        },\n        {\n          id: \"4\",\n          name: \"Wok Express\"\n        },\n        {\n          id: \"5\",\n          name: \"Qdoba\"\n        },\n        {\n          id: \"6\",\n          name: \"Dave and Tony's\"\n        },\n        {\n          id: \"7\",\n          name: \"Hu Hot\"\n        },\n        {\n          id: \"8\",\n          name: \"Sybergs\"\n        },\n        {\n          id: \"9\",\n          name: \"Viviano's\"\n        },\n        {\n          id: \"10\",\n          name: \"Trainwreck\"\n        },\n        {\n          id: \"11\",\n          name: \"DD Mau\"\n        },\n        {\n          id: \"12\",\n          name: \"Gobble Stop\"\n        },\n        {\n          id: \"13\",\n          name: \"First Watch\"\n        },\n        {\n          id: \"14\",\n          name: \"Pei Wei\"\n        },\n        {\n          id: \"15\",\n          name: \"Balducci's\"\n        },\n        {\n          id: \"16\",\n          name: \"Mod Pizza\"\n        },\n        {\n          id: \"17\",\n          name: \"China One\"\n        },\n        {\n          id: \"18\",\n          name: \"Casa Juarez\"\n        },\n        {\n          id: \"19\",\n          name: \"Edge Wild\"\n        },\n        {\n          id: \"20\",\n          name: \"Rotisserie\"\n        },\n        {\n          id: \"21\",\n          name: \"O'Fallon Brewery\"\n        },\n        {\n          id: \"22\",\n          name: \"Bandana's BBQ\"\n        },\n        {\n          id: \"23\",\n          name: \"Snarf’s\"\n        },\n        {\n          id: \"24\",\n          name: \"Vivola Express\"\n        },\n        {\n          id: \"25\",\n          name: \"Sushi Ai\"\n        },\n        {\n          id: \"26\",\n          name: \"California Pizza Kitchen\"\n        },\n        {\n          id: \"27\",\n          name: \"Fuzzy's Tacos\"\n        },\n        {\n          id: \"28\",\n          name: \"Seoul Taco\"\n        },\n        {\n          id: \"29\",\n          name: \"Gioia's Deli\"\n        },\n        {\n          id: \"30\",\n          name: \"Waffle House\"\n        },\n        {\n          id: \"31\",\n          name: \"The Shack\"\n        },\n        {\n          id: \"32\",\n          name: \"McAlister's\"\n        },\n        {\n          id: \"33\",\n          name: \"El Maguey\"\n        },\n        {\n          id: \"34\",\n          name: \"Mr. Piggy’s Smokehouse\"\n        },\n        {\n          id: \"35\",\n          name: \"Chipotle\"\n        }\n      ]\n    };\n  },\n  methods: {\n    runSlots() {\n      // clear the selected restaurant\n      this.selectedRestaurant = null;\n      // get the last item in past selections\n      const lastSelected = this.pastSelections[this.pastSelections.length - 1];\n      // filter out any items from the restaurant array that are in the past selections array\n      let slotsArray = this.restaurants.filter(\n        (it) => !this.pastSelections.find((past) => past.id === it.id)\n      );\n      // get a randowm index from the slots array\n      const selectedIndex = Math.floor(Math.random() * slotsArray.length);\n      // get a version of the slots array trimmed to the selected restaurant\n      const trimmedSlotsArray = slotsArray.slice(0, selectedIndex + 1);\n      // build out the scrolling list\n      let scrollSlotsArray = [...slotsArray, ...slotsArray];\n      // if there is a last selected item, add it to the beginning of the list so the animation doesn't jump\n      if (lastSelected) scrollSlotsArray = [lastSelected, ...scrollSlotsArray];\n      // set the slots array for the UI\n      this.slots = [...scrollSlotsArray, ...trimmedSlotsArray];\n      // run the animation\n      this.isRunning = true;\n      // after the animation is done, set the selected restaurant, push to past selections, reset the slots array, and stop the animation\n      setTimeout(() => {\n        this.selectedRestaurant = slotsArray[selectedIndex];\n        this.pastSelections.push(this.selectedRestaurant);\n        this.slots = [this.selectedRestaurant];\n        this.actionText = \"Nah, Something Else\";\n        this.isRunning = false;\n      }, 5000);\n    }\n  }\n};\n</script>\n\n<style>\n@import url(\"https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;700&display=swap\");\n:root {\n  --primary: #5fb3b3;\n  --primary-lightest: #9be2e2;\n  --primary-light: #79c2c4;\n  --primary-dark: #1a8384;\n  --ink: #0f1c23;\n  --ink-light: #343d46;\n  --timing-l: 5s;\n  --timing-s: 0.5s;\n}\nbody {\n  color: var(--ink-light);\n  font-family: \"IBM Plex Sans\", sans-serif;\n}\nh1 {\n  color: var(--ink);\n  font-size: 1.75rem;\n  font-weight: 700;\n}\n.container {\n  box-sizing: content-box;\n  max-width: 75ch;\n  margin-left: auto;\n  margin-right: auto;\n  padding: max(1rem, 4vw);\n}\n.container > * + * {\n  margin-top: var(--spacer, 1.5em);\n}\n.container > p {\n  line-height: 1.6;\n}\n.slot-machine {\n  height: 8rem;\n  overflow: hidden;\n  border: 2px solid var(--primary);\n  position: relative;\n}\n.slot-list {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  transition: 0s;\n}\n.slot-text {\n  background: transparent;\n  border: none;\n  display: grid;\n  font-size: clamp(1.75rem, 2.25vw + 1rem, 4rem);\n  font-weight: 700;\n  height: 8rem;\n  margin: 0;\n  place-content: center;\n  padding: 0;\n  text-align: center;\n  width: 100%;\n}\n.running {\n  transform: translateY(calc(-100% + 8rem));\n  transition: var(--timing-l) cubic-bezier(0.19, 0.97, 0.5, 1.005);\n}\n.starter {\n  color: var(--primary-light);\n}\n.trigger {\n  background-color: var(--primary);\n  backface-visibility: hidden;\n  border: none;\n  color: white;\n  display: flex;\n  font-size: 1.25rem;\n  font-weight: 700;\n  justify-content: center;\n  margin-left: auto;\n  margin-right: auto;\n  padding: 1rem;\n  perspective: 10000px;\n  position: relative;\n  transform-style: preserve-3d;\n  transition: transform var(--timing-s);\n  width: 15rem;\n}\n.trigger::before,\n.trigger::after {\n  background-color: var(--primary);\n  backface-visibility: hidden;\n  content: \"\";\n  display: block;\n  height: 1rem;\n  position: absolute;\n  top: 100%;\n  transform: rotateX(-90deg);\n  transform-origin: 50% 0%;\n  width: 100%;\n}\n.trigger::after {\n  background-color: var(--primary-dark);\n  transform: rotateX(-90deg) scaleX(0);\n  transition-delay: var(--timing-s);\n}\n.trigger:hover {\n  background-color: var(--primary-dark);\n}\n.trigger:disabled {\n  background-color: var(--primary-light);\n  transform: rotateX(90deg);\n}\n.trigger:disabled::after {\n  transform: rotateX(-90deg) scaleX(1);\n  transform-origin: 0 0;\n  transition: transform 4s linear var(--timing-s);\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

export default __vue_component__;